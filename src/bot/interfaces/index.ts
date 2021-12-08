import { Message } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export interface ICommand {
  data: SlashCommandBuilder
  // Making `args` optional
  execute(message: Message, args?: string[]): Promise<void>
}

export interface IEvent {
  name: string
  once: boolean
  // Making `args` optional
  execute(...args: undefined[]): Promise<void>
}
