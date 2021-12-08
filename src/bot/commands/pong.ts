import { Message } from 'discord.js';
import { ICommand } from '../interfaces';
import { SlashCommandBuilder } from '@discordjs/builders';

const command: ICommand = {
  data: new SlashCommandBuilder()
      .setName('pong')
      .setDescription('Ping!'),
  async execute(message: Message, args: string[]) {
    await message.channel.send(`${message.author.toString()} Ping!`);
  }
};

export = command;
