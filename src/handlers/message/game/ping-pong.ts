import { Client, Message } from 'discord.js';
import { IMessageHandler } from '../../interfaces';

export class PingHandler implements IMessageHandler {
  public async doProcessing(client: Client, message: Message) {
    await message.reply('pong');
  }
}

export class PongHandler implements IMessageHandler {
  public async doProcessing(client: Client, message: Message) {
    await message.channel.send(`ping ${message.author.toString()}`);
  }
}
