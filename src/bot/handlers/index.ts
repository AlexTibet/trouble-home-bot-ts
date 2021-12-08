import { Message } from 'discord.js';
import { Handler } from './Handler';
import { CommandHandler } from './CommandHandler';
import { OtherHandler } from './OtherHandler';
import { DefaultHandler } from './DefaultHandler';


class MessageHandler {
  handler: Handler;

  constructor(handler: Handler = new DefaultHandler()) {
    this.handler = handler;
  }

  setHandler(handler: Handler): void {
    this.handler = handler;
  }

  async execute(message: Message): Promise<void> {
    await this.handler.execute(message);
  }
}

export default {
  MessageHandler,
  CommandHandler,
  OtherHandler
};
