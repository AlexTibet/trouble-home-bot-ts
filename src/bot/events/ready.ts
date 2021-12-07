import { Client } from 'discord.js';
import { IEvent } from '../interfaces';
import options from '../../config/options';

const event: IEvent = {
  name: 'ready',
  once: true,
  async execute(client: Client): Promise<void> {
    console.log(`I am ready!\n${client.user.username} run in:`);

    for (const [, guild] of client.guilds.cache) {
      console.log(`\t${guild.name} with ${guild.memberCount} users`);
    }

    const activityInfo = await client.user.setActivity(options.activity);
    console.log(`Set status: ${ activityInfo.status }, ${ activityInfo.activities }`);
  }
};

export = event;
