import { Message } from 'discord.js';
import { IEvent } from '../interfaces';
import { MessageHandler } from '../handlers';

const event: IEvent = {
  name: 'messageCreate',
  once: false,
  async execute(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }

    await new MessageHandler(message).execute();
  }
};

export = event;
