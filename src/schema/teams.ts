import { USERS } from "./users";
import { E_Access, E_Role, E_Testing, E_Worker } from "./models/enums";
import type { T_User, T_Team } from "./models/types";

// worker to user
const wu = (worker: E_Worker): T_User => {
  const user = USERS.find((u) => u.name === worker);
  if (!user) throw new Error("C_User not found");
  return user;
};

// design philsophy for role members - ease of use
// guiding question: who needs to stay in the loop? what's the use-case for pinging?
const founders = [
  E_Worker.JesseLee,
  E_Worker.IshaanBansal,
  E_Worker.MridulPrasad,
].map(wu);
const everyone = Object.values(E_Worker).map(wu);

export const TEAMS: T_Team[] = [
  {
    role: E_Role.Admin,
    discord_id: "1133490969212354651",
    members: [...founders],
    access: E_Access.Admin,
  },
  {
    role: E_Role.Finance,
    discord_id: "1135719639356280902",
    members: [...founders, wu(E_Worker.AgrimDhingra)],
    access: E_Access.Finance,
  },
  {
    role: E_Role.AM,
    discord_id: "1281571738555252796",
    members: [wu(E_Worker.SeanAndreMembrido), wu(E_Worker.JesseLee)],
    access: E_Access.Team,
  },
  {
    role: E_Role.Marketing,
    discord_id: "1281660792260923403",
    members: [...founders, wu(E_Worker.ShashankBypan)],
    access: E_Access.Team,
  },
  {
    role: E_Role.Sales,
    discord_id: "1281649124860756020",
    members: [
      wu(E_Worker.MridulPrasad),
      wu(E_Worker.ShashankBypan),
      wu(E_Worker.ViditBatta),
      wu(E_Worker.RaghuramPadmanabhuni),
    ],
    access: E_Access.Team,
  },
  {
    role: E_Role.Counseling,
    discord_id: "1281660665752457348",
    members: [
      ...founders,
      wu(E_Worker.TanaySubramanian),
      wu(E_Worker.AmandipDutta),
    ],
    access: E_Access.Team,
  },
  {
    role: E_Role.Operations,
    discord_id: "1282648926259904533",
    members: [...founders],
    access: E_Access.Team,
  },
  {
    role: E_Role.Tech,
    discord_id: "1281661066270478336",
    members: [wu(E_Worker.JesseLee), wu(E_Worker.IshaanBansal)],
    access: E_Access.Team,
  },
  {
    role: E_Role.Team,
    discord_id: "1281582948369436692",
    members: everyone,
    access: E_Access.Team,
  },
  // not a real Discord role, for testing purposes
  {
    role: E_Testing.Testing,
    discord_id: "1281666441568981062",
    members: founders,
    access: E_Access.Admin,
  },
];

// Queries

export const getTeam = (value: string, key: keyof T_Team) => {
  return TEAMS.find((team) => team[key] === value);
};

export const accessUsers = (access: E_Access) => {
  switch (access) {
    case E_Access.Admin:
      return founders;
    case E_Access.Finance:
      return [...founders, wu(E_Worker.AgrimDhingra)];
    default:
      return everyone;
  }
};
