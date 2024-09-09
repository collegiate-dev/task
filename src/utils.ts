import { type MessageMentions } from "discord.js";
import { getRole, getRoleUsers, getUser } from "./data";
import type { User } from "./data/users";
import type { TodoChannel } from "./data/channels";

export const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
};

export const parseMentions = (
  mentions: MessageMentions<boolean>,
  channel: TodoChannel
) => {
  const users = mentions.users
    .map((user) => getUser(user.id, "discord_id"))
    .filter(isDefined);

  const roleUsers = mentions.roles.reduce((acc: User[], r) => {
    const role = getRole(r.id, "discord_id");
    const roleUsers = getRoleUsers(role);
    return acc.concat(roleUsers);
  }, []);

  // remove duplicate users
  let mentioned = [...new Set(users.concat(roleUsers))];
  const role = getRole(channel.name, "name");

  // filters message pinging for channels
  // ex: in admin-todos, @AM will not create a task
  if (!role) return mentioned;
  return mentioned.filter((user) => role.members.includes(user.name));
};
