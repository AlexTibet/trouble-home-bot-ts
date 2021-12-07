import { Message } from 'discord.js';

export class MessageHandler {
  message: Message;
  // handler: Handler;

  constructor(message: Message) {
    this.message = message;
  }
  async baseHandler(): Promise<void> {
    console.log(this.message.content);
  }

  async execute(): Promise<void> {
    await this.baseHandler();
  }
}
