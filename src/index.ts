import { discord } from "./clients";
import { createTask } from "./notion";
import { getTodo, getUser, selectLoggers, validTodoChannel } from "./data";
import { MessageHelper } from "./message";
import type { Message } from "discord.js";
import { parseMentions } from "./utils";

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
    const messageHelper = new MessageHelper(message);

    const task = messageHelper.formattedMessage();
    const url = messageHelper.messageUrl();

    const assigner = getUser(message.author.username, "discord_username");
    const channel = getTodo(message.channel.id, "channel_id");

    // we need an input channel in all scenarios
    if (!channel || !assigner) {
      console.error("Invalid channel or assigner");
      return;
    }

    // get everyone needed to create a task for
    const assignTasks = parseMentions(message.mentions, channel);
    if (assignTasks.length === 0) return; // only run on pings

    // TODO from here

    // generate tasks, if error we log and return
    try {
      await Promise.all(
        assignTasks.map(async (assigned) => {
          await createTask(
            task,
            url,
            channel.name,
            assigner.notion,
            assigned.notion
          ); // this is why we use typescript dawg
        })
      );
    } catch (error) {
      // notifies @Tech of error
      const errorMessage = `<@&1281661066270478336> **TASKMASTER ERROR!**\n${
        assigner.name
      } tried to assign task to: ${mentioned
        .map((user) => user.name)
        .join(", ")}, but failed to create task.\n${url}`; // migrate to message helper
      errorLog.send(errorMessage);
      return;
    }

    // successful log output
    const successMessage = `${assigner.name} assigned task to: ${mentioned
      .map((user) => user.name)
      .join(", ")}\n**${task}**\n${url}`;

    successLog.send(successMessage); // migrate to message helper
    console.log("\n" + successMessage);
  }
});
