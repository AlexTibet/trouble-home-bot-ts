import { Client, Message } from 'discord.js';
import { IEvent } from '../interfaces';

const event: IEvent = {
  name: 'ready',
  once: true,
  async execute(client: Client): Promise<void> {
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
};

export = event;
