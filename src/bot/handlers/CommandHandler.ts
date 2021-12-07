import { Handler } from './Handler';
import options from '../../config/options';
import { bot } from '../index';

export class CommandHandler extends Handler {
  async execute(): Promise<void> {
    const [commandName, ...args] = this.message.content.slice(options.commands.prefix.length).split(/ +/);
    const command = bot.commands.find((command) => command.name === commandName);

    if (command) {
      await command.execute(this.message, args);
    }
  }
}
