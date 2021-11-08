import { Client, Message } from 'discord.js';
import { Handler } from '../handlers/base';

export class Bot {
  private readonly client: Client;
  private readonly token: string;

  constructor(token: string) {
    this.client = new Client();
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
