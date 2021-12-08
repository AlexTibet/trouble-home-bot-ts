import { Message } from 'discord.js';

export interface Handler {
  execute(message: Message): Promise<void>
}
