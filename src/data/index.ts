// use this file to interface with data schema; treat as queries
import type { ChannelManager, TextChannel } from "discord.js";
import { Loggers, loggers, todos, type TodoChannel } from "./channels";
import { roles, type Role } from "./roles";
import { users, type User } from "./users";
import { isDefined } from "../utils";

export const getUser = (value: string, key: keyof User) => {
  throw new Error("fix ./users.ts discord ids + set tanay, amandip");
  return users.find((user) => user[key] === value);
};

export const getRole = (value: string, key: keyof Role) => {
  return roles.find((role) => role[key] === value);
};

export const getRoleUsers = (role?: Role) => {
  if (!role) return [];
  return role.members.map((name) => getUser(name, "name")).filter(isDefined);
};

export const getTodo = (value: string, key: keyof TodoChannel) => {
  return todos.find((t) => t[key] === value);
};

export const validTodoChannel = (channelId: string) => {
  return !!getTodo(channelId, "channel_id");
};

export const selectLoggers = (channelManager: ChannelManager) => {
  const getLogger = (logger: Loggers) => {
    const log = loggers.find((l) => l["name"] === logger);
    const channel = channelManager.cache.get(log!.channel_id); // should be safe
    if (!channel) throw new Error("Channel not found");
    return channel as TextChannel;
  };

  const prodSuccess = getLogger(Loggers.TodoLogs);
  const testingSuccess = getLogger(Loggers.TestingTodoLogs);
  const errorLog = getLogger(Loggers.ErrorLogs);

  return { errorLog, successLog: prodSuccess || testingSuccess }; // TODO, check via railway instead
};
