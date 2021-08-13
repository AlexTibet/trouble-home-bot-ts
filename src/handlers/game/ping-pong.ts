import {Client, Message} from "discord.js";
import { IMessageHandler } from "../interfaces";

class PingHandler implements IMessageHandler {
  public async doAlgorithm(client: Client, message: Message) {
    await message.reply('pong');
    await message.author.send(`pong ${message.author.toString()}`);
    await message.channel.send('pong')
  }
}

class PongHandler implements IMessageHandler {
  public async doAlgorithm(client: Client, message: Message) {
    await message.reply('ping');
  }
}

export default [
  PingHandler,
  PongHandler
]
