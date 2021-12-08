import { Handler } from './Handler';
import { Message } from 'discord.js';

export class OtherHandler implements Handler {
  async execute(message: Message): Promise<void> {
    console.log('OtherHandler');
    console.log(message.content, 'in', message.channelId);
  }
}
