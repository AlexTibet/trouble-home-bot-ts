import { Client, Message } from "discord.js";
import { IMessageHandler } from "./interfaces";

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

class DefaultHandler implements IMessageHandler {
  public async doAlgorithm(client: Client, message: Message) {
    console.log(`Message: ${message.content} not processed`)
  }
}


export default [
  Context,
  DefaultHandler
]