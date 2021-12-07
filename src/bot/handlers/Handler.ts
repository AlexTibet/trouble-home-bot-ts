import { Message } from 'discord.js';

export abstract class Handler {
  message: Message;

  constructor(message) {
    this.message = message;
  }

  abstract execute(): Promise<void>
}
