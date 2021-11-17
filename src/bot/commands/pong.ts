import { Message } from 'discord.js';
import { ICommand } from '../interfaces';

const command: ICommand = {
  name: 'pong',
  description: 'Ping!',
  async execute(message: Message, args: string[]) {
    await message.channel.send(`${message.author.toString()} Ping!`);
  }
};

export = command;
