import { notion } from "./clients";

const truncate = (str: string) => str.substring(0, 30) + "...";
export const createTask = async (task, url, channel, assignerId, assignedId) =>
  notion.pages.create({
    parent: { database_id: "42ab110e5caf4c7d8eeb28a815805fc5" }, // todos notion db
    properties: {
      Task: {
        title: [
          {
            text: {
              content: truncate(task),
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
