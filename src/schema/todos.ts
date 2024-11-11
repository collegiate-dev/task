import { TEAMS } from "./teams";
import { E_Role } from "./models/enums";
import type { T_Team, T_TodoChannel } from "./models/types";

// role to team
const rt = (role: E_Role | "Testing"): T_Team => {
  const team = TEAMS.find((t) => t.role === role);
  if (!team) throw new Error("Team not found");
  return team;
};

// current model does not have a great seperation of concerns
// T_TodoChannel is flawed:
// team (T_Team) should not be bound to a channel (T_Channel)
export const TODOS: T_TodoChannel[] = [
  {
    team: rt(E_Role.Admin),
    tag: "Admin",
    channel_name: "📝┃admin-todos",
    channel_id: "1133467940180734015",
  },
  {
    team: rt(E_Role.Finance),
    tag: "Finance",
    channel_name: "📝┃finance-todos",
    channel_id: "1219430575660859575",
  },
  {
    team: rt(E_Role.Team),
    tag: "Team",
    channel_name: "🎓┃team-todos",
    channel_id: "1281666129164501073",
  },
  {
    team: rt(E_Role.Marketing),
    tag: "Marketing",
    channel_name: "🎨┃marketing-todos",
    channel_id: "1282638263584161792",
  },
  {
    team: rt(E_Role.Sales),
    tag: "Sales",
    channel_name: "📈┃sales-todos",
    channel_id: "1282637508299194418",
  },
  {
    team: rt(E_Role.Counseling),
    tag: "Counseling",
    channel_name: "🗂┃counseling-todos",
    channel_id: "1282637912256548897",
  },
  {
    team: rt(E_Role.Operations),
    tag: "Operations",
    channel_name: "🗺┃operations-todos",
    channel_id: "1282638012953661470",
  },
  {
    team: rt(E_Role.Tech),
    tag: "Tech",
    channel_name: "🤖┃tech-todos",
    channel_id: "1282637597016850463",
  },
  {
    team: rt(E_Role.Team),
    tag: "Learning",
    channel_name: "🧠┃learning-todos",
    channel_id: "1305581012931051531",
  },
  {
    team: rt("Testing"),
    tag: "Testing",
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
