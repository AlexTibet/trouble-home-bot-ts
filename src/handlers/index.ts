import { Client, Message } from "discord.js";

class Context {
  private handler: IMessageHandler;

  constructor(handler: IMessageHandler) {
    this.handler = handler;
  }

  public setHandler(handler: IMessageHandler) {
    this.handler = handler;
  }

  public doProcessing(client: Client, message: Message): void {
    this.handler.doAlgorithm(client, message);
  }
}


interface IMessageHandler {
  doAlgorithm(client: Client, message: Message): void;
}

class DefaultHandler implements IMessageHandler {
  public async doAlgorithm(client: Client, message: Message) {
    console.log(`Message: ${message.content} not processed`)
  }
}

class PingHandler implements IMessageHandler {
  public async doAlgorithm(client: Client, message: Message) {
    await message.reply('pong');
  }
}

class PongHandler implements IMessageHandler {
  public async doAlgorithm(client: Client, message: Message) {
    await message.reply('ping');
  }
}

export {Context, IMessageHandler, PingHandler, PongHandler, DefaultHandler}