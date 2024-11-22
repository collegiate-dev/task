import { Client as NotionClient } from "@notionhq/client";
import { Client as DiscordClient, GatewayIntentBits } from "discord.js";

export const discord = new DiscordClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
  ],
});
discord.login(process.env.DISCORD);

export const minerBot = new DiscordClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
minerBot.login(process.env.MINER_DISCORD);

export const notion = new NotionClient({ auth: process.env.NOTION });
