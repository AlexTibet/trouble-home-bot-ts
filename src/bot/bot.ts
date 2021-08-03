import { Client, Message } from "discord.js";

export class Bot {
  private client: Client;
  private readonly token: string;

  constructor() {
    this.client = new Client();
    this.token = process.env.DISCORD_BOT_TOKEN;
  };

  public listen(): Promise<string> {

    this.client.on('message', (message: Message) => {
      console.log("Message received! Contents: ", message.content);
    });

    this.client.on('ready', () => {
      console.log('I am ready!');
    });


    return this.client.login(this.token);
  };
}