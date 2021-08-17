import { Client, Message } from "discord.js";
import baseHandlers from '../handlers'
import gameHandlers from '../handlers/game'
import {MessageHandler} from "../handlers/base";

export class Bot {
  private readonly client: Client;
  private readonly token: string;

  constructor() {
    this.client = new Client();
    this.token = process.env.DISCORD_BOT_TOKEN;
  };

  public listen(): Promise<string> {

    this.client.on('message', (message: Message) => {
      MessageHandler.doProcessing(this.client, message);
    });

    this.client.on('ready', () => {
      console.log(`I am ready!\n${ this.client.user.username } run in:`);

      for (const guild of this.client.guilds.cache) {
        console.log(`\t${guild[1].name} with ${guild[1].memberCount} users`)
      }
      this.client.user.setActivity({name: 'name', type: 'WATCHING'})
        .then(r =>{ console.log(`Set status: ${ r.status }, ${ r.activities }`) });
    });

    this.client.on('warn', (w) => {
      console.warn(`WARNING info: ${ w }`)
    })

    this.client.on('error', (e) => {
      console.error(`ERROR info: ${ e }`)
    })

    return this.client.login(this.token);
  };
}