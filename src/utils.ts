import type { Message, MessageReference } from "discord.js";

export const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
};

export const truncate = (str: string) => str.substring(0, 30) + "...";

// retrieve Discord message based on message reference object
export const getMessageFromReference = async (reference: MessageReference) => {
  const { channelId, messageId } = reference;
  if (!channelId || !messageId) {
    throw new Error("Channel ID or Message ID is missing from the reference.");
  }
  const url = `https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch message: ${response.statusText}`);
  }
  return (await response.json()) as Message | undefined;
};
