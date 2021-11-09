// import { SlashCommandBuilder } from '@discordjs/builders';
//
// const data = new SlashCommandBuilder();
// data.setName('ping');
// data.setDescription('Replies with Pong!');
//
//
// module.exports = {
//   data,
//   async execute(interaction) {
//     await interaction.reply('Pong!');
//   }
// };

import { Message } from 'discord.js';
import { ICommand } from './index';

const command: ICommand = {
  name: 'pong',
  description: 'Pong!',
  async execute(message: Message, args: string[]) {
    await message.channel.send('Ping');
    console.log('send(\'Ping\');');
    console.log(args);
  }
};

export = command
