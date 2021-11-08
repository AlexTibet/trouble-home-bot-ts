import { SlashCommandBuilder } from '@discordjs/builders';

const data = new SlashCommandBuilder();
data.setName('ping');
data.setDescription('Replies with Pong!');


module.exports = {
  data,
  async execute(interaction) {
    await interaction.reply('Pong!');
  }
};
