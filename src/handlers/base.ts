import { Client, Message } from "discord.js";
import gameHandlers from "./message/game";
import { MessageHandler, DefaultMessageHandler } from "./message";

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

    let handler = new MessageHandler(new DefaultMessageHandler());

    if (handlerList.hasOwnProperty(message.content)) {
      handler.setConcreteHandler(new handlerList[message.content]());
    }

    handler.doProcessing(client, message);
  }
}