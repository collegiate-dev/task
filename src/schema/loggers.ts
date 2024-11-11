import type { ChannelManager, TextChannel } from "discord.js";
import { E_Logger } from "./models/enums";
import type { T_LoggerChannel } from "./models/types";
import { __prod__ } from "../constants";

export const LOGGERS: T_LoggerChannel[] = [
  {
    name: E_Logger.TodoLogs,
    tag: "Todo Log",
    channel_name: "🪵┃todo-logs",
    channel_id: "1281844382755979265",
  },
  {
    name: E_Logger.TestingTodoLogs,
    tag: "Testing Log",
    channel_name: "🪵┃testing-todo-logs",
    channel_id: "1281666441568981062",
  },
  {
    name: E_Logger.ErrorLogs,
    tag: "Error Log",
    channel_name: "🚨┃error-logs",
    channel_id: "1281898208708001873",
  },
];

// Queries
export const selectLoggers = (channelManager: ChannelManager) => {
  const getLogger = (logger: E_Logger) => {
    const log = LOGGERS.find((l) => l["name"] === logger);
    if (!log) throw new Error("Logger not found");
    const channel = channelManager.cache.get(log.channel_id);
    if (!channel) throw new Error("Channel not found");
    return channel as TextChannel;
  };

  const prodSuccess = getLogger(E_Logger.TodoLogs);
  const testingSuccess = getLogger(E_Logger.TestingTodoLogs);
  const errorLog = getLogger(E_Logger.ErrorLogs);

  return { errorLog, successLog: __prod__ ? prodSuccess : testingSuccess };
};
