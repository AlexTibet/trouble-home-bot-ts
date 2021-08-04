import { Client, Message } from "discord.js";

interface IMessageHandler {
  readonly type: string;
  readonly message: Message;
}

abstract class MessageHandler implements IMessageHandler {
  abstract readonly type: string;
  abstract readonly message: Message;
  abstract getAnswer(Client, any): void
}

class PingHandler extends MessageHandler {
  type: string;
  message: Message;

  constructor(handlerType: string, message: Message) {
    super();
    this.type = handlerType;
    this.message = message
  }
  getAnswer(client: Client, channel: any) {
    const data: string = 'pong'
    console.log(data)
    this.message.reply(data)
  }
}

export class Bot {
  private readonly client: Client;
  private readonly token: string;

  constructor() {
    this.client = new Client();
    this.token = process.env.DISCORD_BOT_TOKEN;
  };

  public listen(): Promise<string> {

    this.client.on('message', (message: Message) => {
      let handler: MessageHandler;
      switch (message.content) {
        case 'ping':
          handler = new PingHandler('ping', message);
          handler.getAnswer(this.client, message.channel)
          break
        case 'pong':
          handler = new PingHandler('pong', message);
          handler.getAnswer(this.client, message.channel)
      }
      console.log("Message received! Contents: ", message.content);
      console.log(handler)
    });

    this.client.on('ready', () => {
      console.log('I am ready!');
    });


    return this.client.login(this.token);
  };
}