import type { ChannelManager, TextChannel } from "discord.js";
import { E_Logger } from "./schema/enums";
import type { T_LoggerChannel } from "./schema/types";

export const LOGGERS: T_LoggerChannel[] = [
  {
    name: E_Logger.TodoLogs,
    channel_name: "🪵┃todo-logs",
    channel_id: "1281844382755979265",
  },
  {
    name: E_Logger.TestingTodoLogs,
    channel_name: "🪵┃testing-todo-logs",
    channel_id: "1281666441568981062",
  },
  {
    name: E_Logger.ErrorLogs,
    channel_name: "🚨┃error-logs",
    channel_id: "1281898208708001873",
  },
];

// Queries

export const selectLoggers = (channelManager: ChannelManager) => {
  const getLogger = (logger: E_Logger) => {
    const log = LOGGERS.find((l) => l["name"] === logger);
    const channel = channelManager.cache.get(log!.channel_id); // should be safe
    if (!channel) throw new Error("Channel not found");
    return channel as TextChannel;
  };

  const prodSuccess = getLogger(E_Logger.TodoLogs);
  const testingSuccess = getLogger(E_Logger.TestingTodoLogs);
  const errorLog = getLogger(E_Logger.ErrorLogs);

  return { errorLog, successLog: testingSuccess }; // TODO, check via railway instead
};
