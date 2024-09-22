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

    // filters message pinging for channels based on access level
    // ex: in admin-todos, typing @AM will not create a task for AM
    const access = accessUsers(channel.team.access);
    members = members.filter((user) => access.includes(user));

    // filters task creation for reply pings, unless specifically tagged
    return this._replyfilter({ members, roleUsers });
  };
  private _replyfilter = async (props: {
    members: T_User[];
    roleUsers: T_User[];
  }) => {
    // get the author of the reply message
    const reference = this.message.reference;
    if (!reference) return props.members;
    const replyMessage = await getMessageFromReference(reference);

    if (!replyMessage) return props.members;
    const replyUser = getUser(replyMessage.author.id, "discord_id");
    console.log(replyUser);
    if (!replyUser) return props.members;
    // check if the author is pinged in the current message via tag or role
    const userMentioned = this.message.content.includes(replyUser.discord_id);
    const roleMentioned = props.roleUsers.includes(replyUser);

    // if they are not pinged this way, filter them out; its likely to be a reply/check-in
    return userMentioned || roleMentioned
      ? props.members
      : props.members.filter((m) => m !== replyUser);
  };

  successMessage = (assigner: T_User, assigned: T_User, notionUrl?: string) => {
    const assignments = this._helpers.assignments(assigner, [assigned]);
    return `${assignments}\n${this._helpers.taskData(notionUrl)}`;
  };
  errorMessage = (assigner: T_User, assigned: T_User[]) => {
    const errorOrigin = __prod__ ? this.PING_TECH_ROLE : "Dev Error:";
    const errorHeader = `${errorOrigin} **TASKMASTER ERROR!**`;
    const assignments = this._helpers.assignments(assigner, assigned);
    return `${errorHeader}\n${assignments}\n${this._helpers.taskData()}`;
  };
  // format message string output functions
  private _helpers = {
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
