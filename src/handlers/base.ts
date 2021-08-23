import { Client, Message } from "discord.js";
import { IMessageHandler } from "./interfaces";
import gameHandlers from "./game";

export abstract class Handler {

  static processReadiness(client: Client) {
    console.log(`I am ready!\n${ client.user.username } run in:`);

    for (const guild of client.guilds.cache) {
      console.log(`\t${guild[1].name} with ${guild[1].memberCount} users`);
    }

    client.user.setActivity(
      {
        name: 'name',
        type: 'WATCHING'
      }
    )
      .then(
        r => {
          console.log(`Set status: ${ r.status }, ${ r.activities }`);
        }
      );
  };

  static processWarning (warn: string) {
    console.warn(`WARNING info: ${ warn }`)
  };

  static processError (err: Error) {
    console.error(`ERROR info: ${ err }`)
  };

  static processMessage(client: Client, message: Message) {

    if (message.author.bot) {
      return;
    }

    const handlerList = {
      'ping': gameHandlers.PingHandler,
      'pong': gameHandlers.PongHandler
    }

    let handler = new MessageHandler(new DefaultHandler());

    if (handlerList.hasOwnProperty(message.content)) {
      handler.setConcreteHandler(new handlerList[message.content]());
    }

    handler.doProcessing(client, message);
  }
}

export class MessageHandler {
  private handler: IMessageHandler;

  constructor(handler: IMessageHandler) {
    this.handler = handler;
  }

  public setConcreteHandler(handler: IMessageHandler) {
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