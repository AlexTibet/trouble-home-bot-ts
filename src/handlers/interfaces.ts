import {Client, Message} from "discord.js";

export interface IMessageHandler {
  doAlgorithm(client: Client, message: Message): void;
}