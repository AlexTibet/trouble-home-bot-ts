import { Message } from 'discord.js';
import options from '../../config/options';
import { CommandHandler } from './CommandHandler';
import { OtherHandler } from './OtherHandler';
import { Handler } from './Handler';


export class MessageHandler {
  handler: Handler;

  constructor(message: Message) {
    this.handler = this.selectHandler(message);
  }

  selectHandler(message: Message): Handler {
    if (message.content.startsWith(options.commands.prefix)) {
      return new CommandHandler(message);
    } else {
      return new OtherHandler(message);
    }
  }

  async execute(): Promise<void> {
    await this.handler.execute();
  }
}
