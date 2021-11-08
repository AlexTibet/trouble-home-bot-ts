import { IMessageHandler } from '../interfaces';
import { Client, Message } from 'discord.js';

export class MessageHandler {
  private handler: IMessageHandler;

  constructor(handler: IMessageHandler) {
    this.handler = handler;
  }

  public static selectConcreteHandler() {

  }

  public setConcreteHandler(handler: IMessageHandler) {
    this.handler = handler;
  }

  public doProcessing(client: Client, message: Message): void {
    this.handler.doProcessing(client, message);
  }
}

export class DefaultMessageHandler implements IMessageHandler {
  public async doProcessing(client: Client, message: Message) {
    console.log(`Message: ${message.content} not processed`)
  }
}
