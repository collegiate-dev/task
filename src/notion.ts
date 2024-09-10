import { notion } from "./clients";
import { truncateTitle } from "./utils";

export const createTasks = async (tasks: CreateTask[]) => {
  const promises = tasks.map((task) => createTask(task));
  return Promise.all(promises);
};

interface CreateTask {
  task: string;
  url: string;
  channel: string;
  assignerId: string;
  assignedId: string;
}
const createTask = async ({
  task,
  url,
  channel,
  assignerId,
  assignedId,
}: CreateTask) => {
  const TASKMASTER_DB_ID = "42ab110e5caf4c7d8eeb28a815805fc5";
  const tt = await notion.pages.create({
    parent: { database_id: TASKMASTER_DB_ID },
    properties: {
      Task: {
        title: [
          {
            text: {
              content: truncateTitle(task),
            },
          },
        ],
      },
      Channel: {
        select: {
          name: channel,
        },
      },
      Assigner: {
        people: [
          {
            id: assignerId,
          },
        ],
      },
      Assigned: {
        people: [
          {
            id: assignedId,
          },
        ],
      },
    },
    children: [
      {
        object: "block",
        bookmark: {
          url,
        },
      },
    ],
  });
};
