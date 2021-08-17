import { Client, Message } from "discord.js";
import { IMessageHandler } from "./interfaces";

export class Handler {
  private handler: IMessageHandler;

  constructor(handler: IMessageHandler) {
    this.handler = handler;
  }

  public setHandler(handler: IMessageHandler) {
    this.handler = handler;
  }

  public doProcessing(client: Client, message: Message): void {
    this.handler.doProcessing(client, message);
  }
}

export class DefaultHandler implements IMessageHandler {
  public async doProcessing(client: Client, message: Message) {
    console.log(`Message: ${message.content} not processed`)
  }
}
