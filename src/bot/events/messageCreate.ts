import { Message } from 'discord.js';
import { IEvent } from '../interfaces';
import { MessageHandler } from '../handlers';

const event: IEvent = {
  name: 'messageCreate',
  once: true,
  async execute(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }
    const handler = new MessageHandler(message);
    await handler.execute();
    console.log(message.content);
  }
};

export = event;
