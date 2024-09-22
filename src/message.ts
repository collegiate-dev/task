// message formatting helper

import type { Message } from "discord.js";
import { getMessageFromReference, isDefined } from "./utils";
import { accessUsers, getTeam } from "./schema/teams";
import type { T_TodoChannel, T_User } from "./schema/models/types";
import { getUser } from "./schema/users";
import { __prod__ } from "./constants";
import { E_Access } from "./schema/models/enums";

export class MessageHelper {
  public PING_TECH_ROLE: string = "<@&1281661066270478336>";
  private message: Message<boolean>;
  constructor(message: Message<boolean>) {
    this.message = message;
  }

  formattedMessage = () => {
    let res = this.message.content;
    // remove mentions <@id>, then replace with a single space
    res = this.message.content
      .replace(/<@[\d]+>|<@&[\d]+>\s*/g, "")
      .replace(/\s\s+/g, " ")
      .trim();
    // remove urls
    res = res.replace(/https?:\/\/\S+/g, "LINK");
    return res || null;
  };

  messageUrl = () => {
    if (!this.message.guild) {
      console.error("MessageHelper: message.guild is undefined");
      return "MISSING_URL";
    }
    return `https://discord.com/channels/${this.message.guild.id}/${this.message.channel.id}/${this.message.id}`;
  };

  // returns a list of mentioned users based on all message pings
  parseMentions = async (channel: T_TodoChannel) => {
    const everyoneOrNone = this.message.mentions.everyone
      ? accessUsers(E_Access.Team) // entire team
      : [];
    const users = this.message.mentions.users
      .map((user) => getUser(user.id, "discord_id"))
      .filter(isDefined);
    const roleUsers = this.message.mentions.roles
      .map((r) => {
        const role = getTeam(r.id, "discord_id");
        return role ? role.members : [];
      })
      .flat();
    let members = [...new Set([...users, ...roleUsers, ...everyoneOrNone])]; // remove duplicate users

    // subroutine to filter task creation for reply pings, unless specifically tagged
    const reference = this.message.reference;
    if (reference) {
      // const referencedMessage = await this.message.channel.messages.fetch(this.message.reference.messageId);
      const message = await getMessageFromReference(reference);
      console.log("cool beans?", message);
      // if (referencedAuthor) {
      //   const referencedUser = getUser(referencedAuthor.id, "discord_id");
      //   if (referencedUser) {
      //     members = members.filter((member) => member !== referencedUser);
      //   }
      // }
    }

    // filters message pinging for channels based on access level
    // ex: in admin-todos, typing @AM will not create a task for AM
    const access = accessUsers(channel.team.access);
    return members.filter((user) => access.includes(user));
  };

  successMessage = (assigner: T_User, assigned: T_User, notionUrl?: string) => {
    const assignments = this.helpers.assignments(assigner, [assigned]);
    return `${assignments}\n${this.helpers.taskData(notionUrl)}`;
  };
  errorMessage = (assigner: T_User, assigned: T_User[]) => {
    const errorOrigin = __prod__ ? this.PING_TECH_ROLE : "Dev Error:";
    const errorHeader = `${errorOrigin} **TASKMASTER ERROR!**`;
    const assignments = this.helpers.assignments(assigner, assigned);
    return `${errorHeader}\n${assignments}\n${this.helpers.taskData()}`;
  };

  // format message string output functions
  private helpers = {
    assignments: (assigner: T_User, assigned: T_User[]) => {
      return `${assigner.name} assigned a task to: ${assigned
        .map((a) => a.name)
        .join(", ")}`;
    },
    taskData: (notionUrl?: string) => {
      const task = this.formattedMessage();
      const taskPage = notionUrl ? `[${task}](${notionUrl})` : task;
      const discordUrl = this.messageUrl();
      return `**${taskPage}**\n${discordUrl}`;
    },
  };
}
