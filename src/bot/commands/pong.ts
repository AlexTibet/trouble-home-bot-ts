import { Message } from 'discord.js';
import { ICommand } from './index';

const command: ICommand = {
  name: 'ping',
  description: 'Ping!',
  async execute(message: Message, args: string[]) {
    await message.channel.send('Pong');
    console.log('send(\'Pong\');');
    console.log(args);
  }
};

export = command
