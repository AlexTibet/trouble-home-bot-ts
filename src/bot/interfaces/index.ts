import { Message } from 'discord.js';

export interface ICommand {
  name: string
  description: string
  // Making `args` optional
  execute(message: Message, args?: string[]): Promise<void>
}
