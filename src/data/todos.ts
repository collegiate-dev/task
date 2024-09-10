import { TEAMS } from "./teams";
import { E_Role } from "./schema/enums";
import type { T_Team, T_TodoChannel } from "./schema/types";

// role to team
const rt = (role: E_Role | "Testing"): T_Team => {
  const team = TEAMS.find((t) => t.role === role);
  if (!team) throw new Error("Team not found");
  return team;
};

export const TODOS: T_TodoChannel[] = [
  {
    team: rt(E_Role.Admin),
    channel_name: "📝┃admin-todos",
    channel_id: "1133467940180734015",
  },
  {
    team: rt(E_Role.Finance),
    channel_name: "📝┃finance-todos",
    channel_id: "1219430575660859575",
  },
  {
    team: rt(E_Role.Team),
    channel_name: "🎓┃team-todos",
    channel_id: "1281666129164501073",
  },
  {
    team: rt(E_Role.Marketing),
    channel_name: "🎨┃marketing-todos",
    channel_id: "1133496251158106232",
  },
  {
    team: rt(E_Role.Sales),
    channel_name: "📈┃sales-todos",
    channel_id: "1166884498156298362",
  },
  {
    team: rt(E_Role.Counseling),
    channel_name: "🗂┃counseling-todos",
    channel_id: "1136767112078180474",
  },
  {
    team: rt(E_Role.Operations),
    channel_name: "🗺┃operations-todos",
    channel_id: "1281569251215540224",
  },
  {
    team: rt(E_Role.Tech),
    channel_name: "🤖┃tech-todos",
    channel_id: "1133492237079150592",
  },
  {
    team: rt("Testing"),
    channel_name: "📝┃testing-todos",
    channel_id: "1281595508896432128",
  },
];

// Queries

export const getTodo = (value: string, key: keyof T_TodoChannel) => {
  return TODOS.find((t) => t[key] === value);
};

export const validTodoChannel = (channelId: string) => {
  return !!getTodo(channelId, "channel_id");
};
