import { Client, Message } from 'discord.js';

export interface ICommand {
  name: string
  description: string
  // Making `args` optional
  execute(message: Message, args?: string[]): Promise<void>
}

export interface IEvent {
  name: string
  once: boolean
  // Making `args` optional
  execute(...args: undefined[]): Promise<void>
}
