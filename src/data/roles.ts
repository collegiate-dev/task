import { Worker } from "./users";

export enum Team {
  Admin = "Admin",
  Finance = "Finance",
  Marketing = "Marketing",
  Operations = "Operations",
  Counseling = "Counseling",
  AM = "AM",
  Tech = "Tech",
  Sales = "Sales",
  Team = "Team",
}
enum Access { // L1 > L2 > L3, refers to channel access
  L1,
  L2,
  L3,
}

// design philsophy for role members - ease of use
// guiding question: who needs to stay in the loop? what's the usecase for pinging?
const founders = [Worker.JesseLee, Worker.IshaanBansal, Worker.MridulPrasad];
const everyone = Object.values(Worker);

export type Role = {
  name: Team;
  discord_id: string;
  members: Worker[]; // who gets notified when this role is pinged
  access: Access;
};
export const roles: Role[] = [
  {
    name: Team.Admin,
    discord_id: "1133490969212354651",
    members: founders,
    access: Access.L1,
  },
  {
    name: Team.Finance,
    discord_id: "1135719639356280902",
    members: [...founders, Worker.AgrimDhingra],
    access: Access.L2,
  },
  {
    name: Team.AM,
    discord_id: "1281571738555252796",
    members: [Worker.SeanAndreMembrido],
    access: Access.L3,
  },
  {
    name: Team.Marketing,
    discord_id: "1281660792260923403",
    members: [...founders, Worker.ShashankBypan],
    access: Access.L3,
  },
  {
    name: Team.Sales,
    discord_id: "1281649124860756020",
    members: [
      Worker.MridulPrasad,
      Worker.ShashankBypan,
      Worker.ViditBatta,
      Worker.RaghuramPadmanabhuni,
    ],
    access: Access.L3,
  },
  {
    name: Team.Counseling,
    discord_id: "1281660665752457348",
    members: [...founders, Worker.TanaySubramanian, Worker.AmandipDutta],
    access: Access.L3,
  },
  {
    name: Team.Operations,
    discord_id: "1282648926259904533",
    members: [...founders],
    access: Access.L3,
  },
  {
    name: Team.Tech,
    discord_id: "1281661066270478336",
    members: [Worker.JesseLee, Worker.IshaanBansal],
    access: Access.L3,
  },
  {
    name: Team.Team,
    discord_id: "1076237004997660725",
    members: everyone,
    access: Access.L3,
  },
];
