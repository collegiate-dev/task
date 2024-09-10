import { notion } from "./clients";
import { E_Access, E_Testing } from "./data/schema/enums";
import type { T_TodoChannel, T_User } from "./data/schema/types";
import { truncate } from "./utils";

interface CreateTask {
  title: string;
  url: string;
  channel: T_TodoChannel;
  assigner: T_User;
  assigned: T_User;
}

// export const createTasks = async (tasks: CreateTask[]) => {
//   const promises = tasks.map((task) => createTask(task));
//   return Promise.all(promises);
// };

// returns created notion page url
export const createTask = async ({
  title,
  url,
  channel,
  assigner,
  assigned,
}: CreateTask) => {
  let properties = {
    Task: NH.setTitle(truncate(title)),
    Status: NH.setSelect("Todo"),
    Assigner: NH.setPerson(assigner.notion_id),
    Assigned: NH.setPerson(assigned.notion_id),
  } as any; // remove any when informally testing code

  if (channel.team.role === E_Testing.Testing) {
    properties = {
      ...properties,
      Status: NH.setSelect("Testing"),
    };
  } else if (channel.team.access === E_Access.Team) {
    properties = {
      ...properties,
      Channel: NH.setSelect(channel.channel_name),
    };
  }

  const created = await notion.pages.create({
    parent: { database_id: channel.team.access },
    properties,
    children: [NH.urlObject(url)],
  });

  // Notion typing is still wrong
  //@ts-ignore
  return created.url as string;
};

// notion helpers to set properties into the right shape
const NH = {
  setTitle: (title: string) => {
    return {
      title: [
        {
          text: {
            content: truncate(title),
          },
        },
      ],
    };
  },
  setSelect: (name: string) => {
    return {
      select: {
        name,
      },
    };
  },
  setPerson: (id: string) => {
    return {
      people: [
        {
          id,
        },
      ],
    };
  },
  urlObject: (url: string) => {
    return {
      object: "block" as const,
      bookmark: {
        url,
      },
    };
  },
};
