import { E_Worker } from "./models/enums";
import type { T_User } from "./models/types";

export const USERS: T_User[] = [
  {
    name: E_Worker.JesseLee,
    discord_username: "onetruejeezus",
    discord_id: "396801573348704256",
    notion_id: "a51dd3c1-4576-4357-837c-c374ace58027",
  },
  {
    name: E_Worker.IshaanBansal,
    discord_username: "bshaan",
    discord_id: "688643965779443729",
    notion_id: "1bc5243a-ba4f-4bf1-9222-6ec0fee72274",
  },
  {
    name: E_Worker.MridulPrasad,
    discord_username: "mridul_p",
    discord_id: "779094302344609792",
    notion_id: "19489ac4-b8a3-4cd2-b743-e79d463041dc",
  },
  {
    name: E_Worker.AgrimDhingra,
    discord_username: "agrim.d",
    discord_id: "440175671218667530",
    notion_id: "381e8acf-d195-47fb-8754-c83dd0f164bd",
  },
  {
    name: E_Worker.RaghuramPadmanabhuni,
    discord_username: "vrmania",
    discord_id: "384476261470306315",
    notion_id: "5361a9d1-0527-4845-8762-9258b7838c87",
  },
  {
    name: E_Worker.ViditBatta,
    discord_username: "saintpablo66",
    discord_id: "605837227464982601",
    notion_id: "03a2556e-14ae-4b97-aeb8-bb4ca9802466",
  },
  {
    name: E_Worker.ShashankBypan,
    discord_username: "shankz9771",
    discord_id: "320732219184381962",
    notion_id: "2d11e383-84ac-4a13-bb47-45e3a683efb1",
  },
  {
    name: E_Worker.SeanAndreMembrido,
    discord_username: "harleypickle",
    discord_id: "290543296177111041",
    notion_id: "7130871c-25be-41c6-b4da-3ace8dd12bac",
  },
  {
    name: E_Worker.TanaySubramanian,
    discord_username: "tanays",
    discord_id: "692469083064631309",
    notion_id: "c8a41622-8747-4bd8-b1f0-7ccf75026cf1",
  },
  {
    name: E_Worker.AmandipDutta,
    discord_username: "dippyyyy",
    discord_id: "439293577764405249",
    notion_id: "453cae0f-295d-42bd-8c3b-a9e38778d476",
  },
];

// Queries
export const getUser = (value: string, key: keyof T_User) => {
  return USERS.find((user) => user[key] === value);
};
