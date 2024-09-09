// message formatting class

import type { Message } from "discord.js";

export class MessageHelper {
  private message: Message<boolean>;
  constructor(message: Message<boolean>) {
    this.message = message;
  }

  formattedMessage = () => {
    return this.message.content
      .replace(/<@[\d]+>|<@&[\d]+>\s*/g, "")
      .replace(/\s\s+/g, " ")
      .trim();
  };

  messageUrl = () => {
    if (!this.message.guild) {
      console.error("MessageHelper: message.guild is undefined");
      return "";
    }
    return `https://discord.com/channels/${this.message.guild.id}/${this.message.channel.id}/${this.message.id}`;
  };
}
// Use regex to match <@id> and surrounding spaces, then replace with a single space
