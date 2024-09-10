// T_ for Types (makes autocomplete easier)

import type { E_Access, E_Logger, E_Role, E_Testing, E_Worker } from "./enums";

export type T_User = {
  name: E_Worker;
  discord_username: string;
  discord_id: string;
  notion_id: string;
};

export type T_Team = {
  role: E_Role | E_Testing;
  discord_id: string;
  members: T_User[]; // who gets notified when this role is pinged
  access: E_Access;
};

type T_Channel = {
  channel_name: string;
  channel_id: string;
};
export type T_TodoChannel = T_Channel & {
  team: T_Team;
};
export type T_LoggerChannel = T_Channel & {
  name: E_Logger;
};
