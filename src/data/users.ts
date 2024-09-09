export enum Worker {
  JesseLee = "Jesse Lee",
  IshaanBansal = "Ishaan Bansal",
  MridulPrasad = "Mridul Prasad",
  AgrimDhingra = "Agrim Dhingra",
  ShashankBypan = "Shashank Bypan",
  ViditBatta = "Vidit Batta",
  RaghuramPadmanabhuni = "Raghuram Padmanabhuni",
  SeanAndreMembrido = "Sean Andre Membrido",
  TanaySubramanian = "Tanay Subramanian",
  AmandipDutta = "Amandip Dutta",
}
export type User = {
  name: Worker;
  discord_username: string;
  discord_id: string;
  notion_id: string;
};
export const users: User[] = [
  // TODOS
  {
    name: Worker.JesseLee,
    discord_username: "onetruejeezus",
    discord_id: "placeholder",
    notion_id: "a51dd3c1-4576-4357-837c-c374ace58027",
  },
  {
    name: Worker.IshaanBansal,
    discord_username: "bshaan",
    discord_id: "placeholder",
    notion_id: "1bc5243a-ba4f-4bf1-9222-6ec0fee72274",
  },
  {
    name: Worker.MridulPrasad,
    discord_username: "mridul_p",
    discord_id: "placeholder",
    notion_id: "19489ac4-b8a3-4cd2-b743-e79d463041dc",
  },
  {
    name: Worker.AgrimDhingra,
    discord_username: "agrim.d",
    discord_id: "placeholder",
    notion_id: "381e8acf-d195-47fb-8754-c83dd0f164bd",
  },
  {
    name: Worker.RaghuramPadmanabhuni,
    discord_username: "vrmania",
    discord_id: "placeholder",
    notion_id: "5361a9d1-0527-4845-8762-9258b7838c87",
  },
  {
    name: Worker.ViditBatta,
    discord_username: "saintpablo66",
    discord_id: "placeholder",
    notion_id: "03a2556e-14ae-4b97-aeb8-bb4ca9802466",
  },
  {
    name: Worker.ShashankBypan,
    discord_username: "shankz9771",
    discord_id: "placeholder",
    notion_id: "2d11e383-84ac-4a13-bb47-45e3a683efb1",
  },
  {
    name: Worker.SeanAndreMembrido,
    discord_username: "harleypickle",
    discord_id: "placeholder",
    notion_id: "7130871c-25be-41c6-b4da-3ace8dd12bac",
  },
  {
    name: Worker.TanaySubramanian,
    discord_username: "placeholder",
    discord_id: "placeholder",
    notion_id: "placeholder",
  },
  {
    name: Worker.AmandipDutta,
    discord_username: "placeholder",
    discord_id: "placeholder",
    notion_id: "placeholder",
  },
];
