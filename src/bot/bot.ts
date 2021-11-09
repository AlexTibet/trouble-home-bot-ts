import { Client, Collection, Intents, Message } from 'discord.js';
import { Handler } from '../handlers/base';

// import * as fs from 'fs';

import { glob } from 'glob'; // included by discord.js
import { promisify } from 'util'; // Included by default
import { ICommand } from './commands';


export class Bot {
  private readonly client: Client;
  private readonly token: string;
  public readonly commands: ICommand[];

  constructor(token: string) {
    console.log('construct')
    this.client = new Client();
    this.commands = [];
    // const commandFiles = fs.readdirSync('../../commands').filter((file) => file.endsWith('.js'));
    // console.log(commandFiles);
    // for (const file of commandFiles) {
    //   const command = require(`./commands/${file}`);
    //   // Set a new item in the Collection
    //   // With the key as the command name and the value as the exported module
    //   client.commands.set(command.data.name, command);
    // }
    this.token = token;
  }

  public async listen(): Promise<string> {
    console.log('listen');
    const prefix = '!';
    // Make `glob` return a promise
    const globPromise = promisify(glob);

    this.client.on('message', (message: Message) => {
      // Prevent the bot from replying to itself or other bots
      if (message.author.bot) {
        return;
      }

      const [commandName, ...args] = message.content
          .slice(prefix.length)
          .split(/ +/);
      console.log(commandName, args)

      const command = this.commands.find((c) => c.name === commandName);

      if (command) {
        console.log('command!')
        console.log(command)
        command.execute(message, args);
      }

      Handler.processMessage(this.client, message);
    });

    this.client.once('ready', async () => {
      console.log('ready')
      // Load all JavaScript / TypeScript files so it works properly after compiling
      // Replace `test` with "await globPromise(`${__dirname}/commands/*.{.js,.ts}`)"
      // I just did this to fix SO's syntax highlighting!
      console.log(__dirname);
      const commandFiles = await globPromise(`${__dirname}/commands/*.{.js,.ts}`);
      console.log(commandFiles)

      for (const file of commandFiles) {
        // I am not sure if this works, you could go for require(file) as well
        const command = await import(file) as ICommand;
        this.commands.push(command);
      }
      Handler.processReadiness(this.client);
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
