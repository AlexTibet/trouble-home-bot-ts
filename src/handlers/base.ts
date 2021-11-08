import { Client, Message } from 'discord.js';
import gameHandlers from './message/game';
import { MessageHandler, DefaultMessageHandler } from './message';

export abstract class Handler {
  static async processReadiness(client: Client): Promise<void> {
    console.log(`I am ready!\n${ client.user.username } run in:`);

    for (const guild of client.guilds.cache) {
      console.log(`\t${guild[1].name} with ${guild[1].memberCount} users`);
    }

    const activityInfo = await client.user.setActivity({
      name: 'name',
      type: 'WATCHING'
    });
    console.log(`Set status: ${ activityInfo.status }, ${ activityInfo.activities }`);
  }

  static async processWarning(warn: string): Promise<void> {
    console.warn(`WARNING info: ${ warn }`);
  }

  static async processError(err: Error): Promise<void> {
    console.error(`ERROR info: ${ err }`);
  }

  static async processMessage(client: Client, message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }

    const handlerList = {
      'ping': gameHandlers.PingHandler,
      'pong': gameHandlers.PongHandler
    };

    const handler = new MessageHandler(new DefaultMessageHandler());

    if (handlerList.hasOwnProperty(message.content)) {
      handler.setConcreteHandler(new handlerList[message.content]());
    }

    handler.doProcessing(client, message);
  }
}
