import { Client, Collection, Intents, Message } from 'discord.js';
import { ICommand, IEvent } from './interfaces';
import * as fs from 'fs';


export class Bot {
  private readonly client: Client;
  private readonly token: string;
  public readonly commands: Collection<string, ICommand>;

  constructor(token: string) {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
    this.token = token;
    this.commands = new Collection();

    this.uploadCommands().then(() => {
      console.log('Commands uploaded', this.commands.keys());
    });
    this.uploadEvents().then((eventList) => {
      console.log('Events uploaded', eventList);
    });
  }

  private static getFiles(dir: string): string[] {
    return fs.readdirSync(dir).filter((file) => file.endsWith('.js'));
  }

  async uploadCommands(): Promise<void> {
    const commandFiles = Bot.getFiles(`${__dirname}/commands/`);

    for (const file of commandFiles) {
      const command = await import(`${__dirname}/commands/${file}`) as ICommand;
      this.commands.set(command.name, command);
    }
  }

  async uploadEvents(): Promise<string[]> {
    const uploadedEvents = [];
    const eventFiles = Bot.getFiles(`${__dirname}/events/`);

    for (const file of eventFiles) {
      const eventListener = (...args: undefined[]): Promise<void> => event.execute(...args);
      const event = await import(`${__dirname}/events/${file}`) as IEvent;
      this.client[event.once ? 'once' : 'on'](event.name, eventListener);
      uploadedEvents.push(event.name);
    }
    return uploadedEvents;
  }

  public async listen(): Promise<string> {
    console.log('listen');
    const prefix = '!';

    this.client.on('message', (message: Message) => {
      if (message.author.bot) {
        return;
      }

      const [commandName, ...args] = message.content.slice(prefix.length).split(/ +/);
      const command = this.commands.find((command) => command.name === commandName);

      if (command) {
        command.execute(message, args);
      }
    });

    return this.client.login(this.token);
  }
}
