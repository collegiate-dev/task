import { Team } from "./roles";

export type Channel = {
  channel_name: string;
  channel_id: string;
};
export type TodoChannel = Channel & {
  name: Team | "Testing";
};

export const todos: TodoChannel[] = [
  {
    name: Team.Admin,
    channel_name: "📝┃admin-todos",
    channel_id: "1133467940180734015",
  },
  {
    name: Team.Finance,
    channel_name: "📝┃finance-todos",
    channel_id: "1219430575660859575",
  },
  {
    name: Team.Team,
    channel_name: "🎓┃team-todos",
    channel_id: "1281666129164501073",
  },
  {
    name: Team.Marketing,
    channel_name: "🎨┃marketing-todos",
    channel_id: "1133496251158106232",
  },
  {
    name: Team.Sales,
    channel_name: "📈┃sales-todos",
    channel_id: "1166884498156298362",
  },
  {
    name: Team.Counseling,
    channel_name: "🗂┃counseling-todos",
    channel_id: "1136767112078180474",
  },
  {
    name: Team.Operations,
    channel_name: "🗺┃operations-todos",
    channel_id: "1281569251215540224",
  },
  {
    name: Team.Tech,
    channel_name: "🤖┃tech-todos",
    channel_id: "1133492237079150592",
  },
  {
    name: "Testing",
    channel_name: "📝┃testing-todos",
    channel_id: "1281595508896432128",
  },
];

export enum Loggers {
  TodoLogs = "🪵┃todo-logs",
  TestingTodoLogs = "🪵┃testing-todo-logs",
  ErrorLogs = "🚨┃error-logs",
}
export type LoggerChannel = Channel & {
  name: Loggers;
};
export const loggers: LoggerChannel[] = [
  {
    name: Loggers.TodoLogs,
    channel_name: "🪵┃todo-logs",
    channel_id: "1281844382755979265",
  },
  {
    name: Loggers.TestingTodoLogs,
    channel_name: "🪵┃testing-todo-logs",
    channel_id: "1281666441568981062",
  },
  {
    name: Loggers.ErrorLogs,
    channel_name: "🚨┃error-logs",
    channel_id: "1281898208708001873",
  },
];
