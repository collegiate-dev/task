// message formatting helper

import type { Message } from "discord.js";
import { isDefined } from "./utils";
import { getTeam } from "./data/teams";
import type { T_TodoChannel, T_User } from "./data/schema/types";
import { getUser } from "./data/users";

const PING_TECH_ROLE = "<@&1281661066270478336>";

export class MessageHelper {
  private message: Message<boolean>;
  constructor(message: Message<boolean>) {
    this.message = message;
  }

  formattedMessage = () => {
    // Use regex to match <@id> and surrounding spaces, then replace with a single space
    return this.message.content
      .replace(/<@[\d]+>|<@&[\d]+>\s*/g, "")
      .replace(/\s\s+/g, " ")
      .trim();
  };

  messageUrl = () => {
    if (!this.message.guild) {
      console.error("MessageHelper: message.guild is undefined");
      return "";
    }
    return `https://discord.com/channels/${this.message.guild.id}/${this.message.channel.id}/${this.message.id}`;
  };

  // returns a list of mentioned users based on all message pings
  parseMentions = (channel: T_TodoChannel) => {
    const users = this.message.mentions.users
      .map((user) => getUser(user.id, "discord_id"))
      .filter(isDefined);
    const roleUsers = this.message.mentions.roles
      .map((r) => {
        const role = getTeam(r.id, "discord_id");
        return role ? role.members : [];
      })
      .flat();

    // remove duplicate users
    const members = [...new Set([...users, ...roleUsers])];

    // // filters message pinging for channels
    // // ex: in admin-todos, typing @AM will not create a task for AM
    const filteredMembers = members.filter((user) =>
      channel.team.members.map((m) => m.name).includes(user.name)
    );

    console.log(
      "filteredMembers",
      filteredMembers.map((u) => u.name)
    );
    return filteredMembers;
  };

  successMessage = (assigner: T_User, assigned: T_User[]) => {
    const assignments = this.helpers.assignments(assigner, assigned);
    return `${assignments}\n${this.helpers.taskData()}`;
  };
  errorMessage = (assigner: T_User, assigned: T_User[]) => {
    const errorHeader = `${PING_TECH_ROLE} **TASKMASTER ERROR!**`;
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
    taskData: () => {
      const task = this.formattedMessage();
      const url = this.messageUrl();
      return `**${task}**\n${url}`;
    },
  };
}
