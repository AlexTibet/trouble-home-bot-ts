import { Client, Message } from "discord.js";
import {Context, DefaultHandler, PingHandler, PongHandler} from '../handlers'

export class Bot {
  private readonly client: Client;
  private readonly token: string;

  constructor() {
    this.client = new Client();
    this.token = process.env.DISCORD_BOT_TOKEN;
  };

  public listen(): Promise<string> {

    this.client.on('message', (message: Message) => {
      console.log("Message received! Contents: ", message.content);

      let handler = new DefaultHandler();

      if (message.content === 'ping') {
        handler = new PingHandler();
      }
      else if (message.content === 'pong') {
        handler = new PongHandler();
      }

      const context = new Context(handler);
      context.doProcessing(this.client, message);
    })

    this.client.on('ready', () => {
      console.log('I am ready!');
    });


    return this.client.login(this.token);
  };
}