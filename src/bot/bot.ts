import { Client, Collection, Intents, Message } from 'discord.js';
import { Handler } from '../handlers/base';

import * as fs from 'fs';

export class Bot {
  private readonly client: Client;
  private readonly token: string;
  public readonly commands: Collection<undefined, undefined>;

  constructor(token: string) {
    this.client = new Client();
    this.commands = new Collection();
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
    this.client.on('message', (message: Message) => {
      Handler.processMessage(this.client, message);
    });

    this.client.on('ready', () => {
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
