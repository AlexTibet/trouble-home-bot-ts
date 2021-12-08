import { Client, Collection, Intents } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { ICommand, IEvent } from './interfaces';
import * as fs from 'fs';

export class Bot {
  public readonly client: Client;
  private readonly token: string;
  public readonly commands: Collection<string, ICommand>;
  public readonly events: Collection<string, IEvent>;

  constructor(token: string) {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
    this.token = token;
    this.commands = new Collection();
    this.events = new Collection();

    this.uploadCommands().then(() => {
      console.log('Commands uploaded', this.commands.keys());
      this.deployCommands().then(() => {
        console.log('Commands deployed', this.commands.keys());
      });
    });
    this.uploadEvents().then(() => {
      console.log('Events uploaded', this.events.keys());
    });
  }

  private static getJsFiles(dir: string): string[] {
    return fs.readdirSync(dir).filter((file) => file.endsWith('.js'));
  }

  async uploadCommands(): Promise<void> {
    const commandFiles = Bot.getJsFiles(`${__dirname}/commands/`);

    for (const file of commandFiles) {
      const command = await import(`${__dirname}/commands/${file}`) as ICommand;
      this.commands.set(command.data.name, command);
    }
  }

  async deployCommands(): Promise<void> {
    const commands = [];
    for (const commandName of this.commands.keys()) {
      const command = this.commands.get(commandName);
      commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(this.token);
    rest.put(Routes.applicationGuildCommands('704397732730634302', '585729392907517962'), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
  }

  async uploadEvents(): Promise<void> {
    const eventFiles = Bot.getJsFiles(`${__dirname}/events/`);

    for (const file of eventFiles) {
      const event = await import(`${__dirname}/events/${file}`) as IEvent;
      const eventListener = (...args: undefined[]): Promise<void> => event.execute(...args);
      this.client[event.once ? 'once' : 'on'](event.name, eventListener);
      this.events.set(event.name, event);
    }
  }

  public async listen(): Promise<string> {
    return this.client.login(this.token);
  }
}
