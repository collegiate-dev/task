import { discord } from "./clients";
import { selectLoggers } from "./data";
import { validTodoChannel } from "./data"; // todo

import { createTask } from "./notion";
// import { formatMessage, parseMentions } from "./utils";
// import { getTodo, validTodoId, getLogger, getUser, getRoleUsers } from "./data";

discord.once("ready", () => {
  if (discord.user) console.log(`Logged in as ${discord.user.tag}`);
  else console.error("Failed to login");
});

discord.on("messageCreate", async (message) => {
  const { errorLog, successLog } = selectLoggers(discord.channels);
  // Ignore messages from bots (including self)
  if (message.author.bot) return;
  //   console.log("at least here", message.content);

  if (validTodoChannel(message.channel.id)) {
    const task = formatMessage(message.content);
    const url = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`; // discord message link
    const assigner = getUser(message.author.username, "discord");
    const channel = getTodo(message.channel.id, "id");

    // get everyone needed to create a task for
    const mentioned = parseMentions(message, channel);

    if (mentioned.length === 0) return; // only run if mentions are found
    // generate tasks, if error we log and return
    try {
      await Promise.all(
        mentioned.map(async (assigned) => {
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
      const errorChannel = discord.channels.cache.get("1281898208708001873"); // 🚨┃error-logs
      // notifies @Tech of error
      const errorMessage = `<@&1281661066270478336> **TASKMASTER ERROR!**\n${
        assigner.name
      } tried to assign task to: ${mentioned
        .map((user) => user.name)
        .join(", ")}, but failed to create task.\n${url}`;

      if (errorChannel) errorChannel.send(errorMessage);
      return;
    }

    const successLog = discord.channels.cache.get(
      getLogger(message.channel.id)
    );
    if (!successLog) return;

    // successful log output
    const success = `${assigner.name} assigned task to: ${mentioned
      .map((user) => user.name)
      .join(", ")}\n**${task}**\n${url}`;

    successLog.send(success);
    console.log("\n" + success);
  }
});
