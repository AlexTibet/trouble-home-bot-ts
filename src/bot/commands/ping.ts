import { Message } from 'discord.js';
import { ICommand } from '../interfaces';
import { SlashCommandBuilder } from '@discordjs/builders';

const command: ICommand = {
  data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Pong!'),
  async execute(message: Message, args: string[]) {
    await message.channel.send('Pong');
  }
};

export = command;
