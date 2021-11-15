import { Client, Collection, Intents, Message } from 'discord.js';
import { Handler } from '../handlers/base';

import * as fs from 'fs';

// import * as glob from 'glob'; // included by discord.js
import { promisify } from 'util'; // Included by default
import { ICommand } from './interfaces';


export class Bot {
  private readonly client: Client;
  private readonly token: string;
  public readonly commands: ICommand[];

  constructor(token: string) {
    this.client = new Client();
    this.commands = [];
    this.token = token;
  }

  public async listen(): Promise<string> {
    console.log('listen');
    const prefix = '!';

    this.client.on('message', (message: Message) => {
      if (message.author.bot) {
        return;
      }

      const [commandName, ...args] = message.content
          .slice(prefix.length)
          .split(/ +/);
      console.log(commandName, args);

      const command = this.commands.find((command) => command.name === commandName);
      console.log(command)
      console.log(this.commands)

      if (command) {
        console.log('command!')
        console.log(command)
        command.execute(message, args);
      }

      // Handler.processMessage(this.client, message);
    });

    this.client.once('ready', async () => {
      const commandFiles = fs.readdirSync(`${__dirname}/commands/`).filter((file) => file.endsWith('.js'));

      for (const file of commandFiles) {
        console.log(file)
        const command = await import(`${__dirname}/commands/${file}`) as ICommand;
        this.commands.push(command);
      }
      await Handler.processReadiness(this.client);
    });

    this.client.on('warn', (warn) => {
      Handler.processWarning(warn);
    });

    this.client.on('error', (err) => {
      Handler.processError(err);
    });

    return this.client.login(this.token);
  }
}
