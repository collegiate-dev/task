import { discord } from "./clients";
import { createTasks } from "./notion";
import { MessageHelper } from "./message";
import { selectLoggers } from "./data/loggers";
import { validTodoChannel, getTodo } from "./data/todos";
import { getUser } from "./data/users";
import type { Message } from "discord.js";

discord.once("ready", () => {
  if (discord.user) console.log(`Logged in as ${discord.user.tag}`);
  else console.error("Failed to login");
});

// casting message type to Message<boolean> cuz idk tf default message type does
discord.on("messageCreate", async (message: Message<boolean>) => {
  // Ignore messages from bots (including self)
  if (message.author.bot) return;

  if (validTodoChannel(message.channel.id)) {
    const { errorLog, successLog } = selectLoggers(discord.channels);
    const MH = new MessageHelper(message);

    const taskContent = MH.formattedMessage();
    const messageUrl = MH.messageUrl();

    const assigner = getUser(message.author.username, "discord_username");
    const channel = getTodo(message.channel.id, "channel_id");

    // we need an input channel in all scenarios
    if (!channel || !assigner) {
      console.error("Invalid channel or assigner");
      return;
    }

    // get everyone needed to create a task for
    const assignments = MH.parseMentions(channel);
    if (assignments.length === 0) return; // only run on pings

    // generate tasks, if error we log and return
    try {
      const tasks = assignments.map((assigned) => {
        return {
          task: taskContent,
          url: messageUrl,
          channel: channel.name,
          assignerId: assigner.notion_id,
          assignedId: assigned.notion_id,
        };
      });
      await createTasks(tasks);

      // successful log output
      const successMessage = MH.successMessage(assigner, assignments);
      successLog.send(successMessage);
      console.log("\n" + successMessage);
    } catch (error) {
      const errorMessage = MH.errorMessage(assigner, assignments);
      errorLog.send(errorMessage);
      console.error(errorMessage + "\n" + error);
      return;
    }
  }
});
