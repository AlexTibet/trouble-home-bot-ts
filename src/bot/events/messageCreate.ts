import { Message } from 'discord.js';
import { IEvent } from '../interfaces';
import { MessageHandler } from '../handlers';
import { bot } from '../index';
import options from '../../config/options';
const { prefix } = options.commands;

const event: IEvent = {
  name: 'messageCreate',
  once: false,
  async execute(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }

    const [commandName, ...args] = message.content.slice(prefix.length).split(/ +/);
    const command = bot.commands.find((command) => command.name === commandName);

    if (command) {
      command.execute(message, args);
    }

    console.log(message.channel.id);
    switch (message.channel.id) {
      case '593300230263406602':
        console.log('CHANNEL!');
        break;
      default: break;
    }
    const handler = new MessageHandler(message);
    await handler.execute();
    console.log(message.content);
  }
};

export = event;
