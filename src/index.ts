import { discord } from "./clients";
import { createTask } from "./notion";
import { MessageHelper } from "./message";
import { selectLoggers } from "./schema/loggers";
import { validTodoChannel, getTodo } from "./schema/todos";
import { getUser } from "./schema/users";
import type { Message } from "discord.js";
import { E_Testing } from "./schema/models/enums";
import { __prod__ } from "./constants";

discord.once("ready", () => {
  if (discord.user)
    console.log(
      `Logged in as ${discord.user.tag} ${process.env.DISCORD} ${process.env.NOTION}`
    );
  else console.error("Failed to login");
});

// casting message type to Message<boolean> cuz idk tf default message type does
discord.on("messageCreate", async (message: Message<boolean>) => {
  console.log(message.content);
  // Ignore messages from bots (including self)
  const MH = new MessageHelper(message);
  if (message.author.bot) return;
  if (validTodoChannel(message.channel.id)) {
    const { errorLog, successLog } = selectLoggers(discord.channels);

    const assigner = getUser(message.author.username, "discord_username");
    const channel = getTodo(message.channel.id, "channel_id");

    // we need an input channel in all scenarios
    if (!channel || !assigner) {
      console.error("Invalid channel or assigner");
      return;
    }

    // get everyone needed to create a task for
    const assignments = await MH.parseMentions(channel);
    if (assignments.length === 0) return; // only run on pings

    // generate tasks, if error we log and return
    try {
      const message = MH.formattedMessage();
      if (!message) return; // prioritizes use case where "pinging only" intent does not create a task
      const taskPromises = assignments.map(async (assigned) =>
        // __prod__ && // uncomment -> if you need to stop creating tasks while testing
        createTask({
          title: message,
          url: MH.messageUrl(),
          channel,
          assigner,
          assigned,
        }).then((notionUrl) => {
          const success = MH.successMessage(assigner, assigned, notionUrl);
          console.log("\n" + success);
          if (__prod__ && channel.team.role === E_Testing.Testing) return;
          successLog.send(success);
        })
      );
      await Promise.all(taskPromises);
    } catch (error) {
      const errorMessage = MH.errorMessage(assigner, assignments);
      console.error(errorMessage + "\n" + error);
      errorLog.send(errorMessage);
      return;
    }
  }
});
