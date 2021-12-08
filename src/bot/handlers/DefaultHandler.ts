import { Handler } from './Handler';
import { Message } from 'discord.js';

export class DefaultHandler implements Handler {
  async execute(message: Message): Promise<void> {
    console.log('DefaultHandler');
    console.log(message.content, 'in', message.channelId);
  }
}
