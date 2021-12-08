import { Handler } from './Handler';
import options from '../../config/options';
import { bot } from '../index';
import { Message } from 'discord.js';

export class CommandHandler implements Handler {
  async execute(message: Message): Promise<void> {
    const [commandName, ...args] = message.content.slice(options.commands.prefix.length).split(/ +/);
    const command = bot.commands.find((command) => command.data.name === commandName);

    if (command) {
      await command.execute(message, args);
    }
  }
}
