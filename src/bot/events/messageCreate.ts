import { Message } from 'discord.js';
import { IEvent } from '../interfaces';
import options from '../../config/options';
import handlers from '../handlers';

const { MessageHandler, CommandHandler, OtherHandler } = handlers;

const event: IEvent = {
  name: 'messageCreate',
  once: false,
  async execute(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }
    const messageHandler = new MessageHandler();

    if (message.content.startsWith(options.commands.prefix)) {
      messageHandler.setHandler(new CommandHandler());
    } else {
      messageHandler.setHandler(new OtherHandler());
    }

    await messageHandler.execute(message);
  }
};

export = event;
