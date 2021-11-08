import { Client, Message } from 'discord.js';

export interface IMessageHandler {
  doProcessing(client: Client, message: Message): void;
}
