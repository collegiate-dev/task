// use this file to interface with data schema; treat as queries
import type { ChannelManager } from "discord.js";
import {
  Loggers,
  loggers,
  todos,
  type LoggerChannel,
  type TodoChannel,
} from "./channels";
import { roles, type Role } from "./roles";
import { users, type User } from "./users";

export const getUser = (value: string, key: keyof User) => {
  return users.find((user) => user[key] === value) || null;
};

export const getRole = (value: string, key: keyof Role) => {
  return roles.find((role) => role[key] === value) || null;
};

export const getRoleUsers = (role: Role) => {
  return role.members.map((name) => getUser(name, "name")).filter(Boolean);
};

export const getTodo = (value: string, key: keyof TodoChannel) => {
  return todos.find((t) => t[key] === value) || null;
};

export const validTodoChannel = (channelId: string) => {
  return getTodo(channelId, "channel_id") !== null;
};

export const selectLoggers = (channelManager: ChannelManager) => {
  const getLogger = (logger: Loggers) => {
    const log = loggers.find((l) => l["name"] === logger);
    const channel = channelManager.cache.get(log!.channel_id); // should be safe
    if (!channel) throw new Error("Channel not found");
    return channel;
  };

  const prodSuccess = getLogger(Loggers.TodoLogs);
  const testingSuccess = getLogger(Loggers.TestingTodoLogs);
  const errorLog = getLogger(Loggers.ErrorLogs);

  return { errorLog, successLog: prodSuccess || testingSuccess }; // TODO, check via railway instead
};
