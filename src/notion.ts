import dayjs from "dayjs";
import { notion } from "./clients";
import { E_Access, E_Testing } from "./schema/models/enums";
import type { T_TodoChannel, T_User } from "./schema/models/types";
import { truncate } from "./utils";

// export const createTasks = async (tasks: CreateTask[]) => {
//   const promises = tasks.map((task) => createTask(task));
//   return Promise.all(promises);
// };

interface CreateTask {
  title: string;
  url: string;
  channel: T_TodoChannel;
  assigner: T_User;
  assigned: T_User;
}

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
    "Start Date": NH.setDate(0),
    Deadline: NH.setDate(3), // default deadline is 3 days
    Assigner: NH.setPerson(assigner.notion_id),
    Assigned: NH.setPerson(assigned.notion_id),
    Channel: NH.setSelect("Team"), // default channel is team
  } as any; // remove any when informally testing code

  if (channel.team.role === E_Testing.Testing) {
    properties = {
      ...properties,
      Status: NH.setSelect("Testing"),
    };
  } else if (channel.team.access === E_Access.Team) {
    properties = {
      ...properties,
      // role needs to be decoupled from channel setup
      Channel: NH.setSelect(channel.tag),
    };
  }

  const created = await notion.pages.create({
    parent: { database_id: channel.team.access },
    properties: {
      ...properties,
    },
    children: [NH.urlObject(url)],
  });

  // Notion sdk typing is still wrong to this day..
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
  setDate: (fromToday: number) => {
    // 0 = today, 1 = tomorrow, 2 = in 2 days, etc
    return {
      date: {
        start: dayjs().add(fromToday, "day").format("YYYY-MM-DD"),
      },
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
