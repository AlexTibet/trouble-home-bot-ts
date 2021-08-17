import { Client, Message } from "discord.js";
import { IMessageHandler } from "./interfaces";
import gameHandlers from "./game";

export abstract class MessageHandler {

  static doProcessing(client: Client, message: Message) {

    if (message.author.bot) {
      return;
    }

    const handlerList = {
      'ping': gameHandlers.PingHandler,
      'pong': gameHandlers.PongHandler
    }

    let handler = new Handler(new DefaultHandler());

    if (handlerList.hasOwnProperty(message.content)) {
      handler.setHandler(new handlerList[message.content]());
    }

    handler.doProcessing(client, message);
  }
}

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
