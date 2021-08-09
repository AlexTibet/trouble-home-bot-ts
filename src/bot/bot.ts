import { Client, Message } from "discord.js";

interface IHandler {
  operation(): string;
}

abstract class HandlerCreator {
  public abstract factoryMethod(): IHandler;
  public someOperation(): string {
    const handler =this.factoryMethod();
    return handler.operation()
  }
}

class PingHandlerCreator extends HandlerCreator {
  public factoryMethod(): IHandler {
    return new PingHandler();
  }
}

class PongHandlerCreator extends HandlerCreator {
  public factoryMethod(): IHandler {
    return new PongHandler();
  }
}

class PingHandler implements IHandler {
  public operation(): string {
    return 'pong'
  }
}

class PongHandler implements IHandler{
  public operation(): string {
    return 'ping'
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


      switch (message.content) {
        case 'ping': {
          const handler = new PingHandlerCreator()
          console.log(handler.someOperation())
          break
        }
        case 'pong': {
          const handler = new PongHandlerCreator()
          console.log(handler.someOperation())
          break
        }
      }
      console.log("Message received! Contents: ", message.content);
    });

    this.client.on('ready', () => {
      console.log('I am ready!');
    });


    return this.client.login(this.token);
  };
}