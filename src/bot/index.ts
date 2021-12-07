import { Bot } from './bot';
import { doc } from '../config/documentation';
import { config } from 'dotenv';
config();

export const bot = new Bot(process.env.DISCORD_BOT_TOKEN);

const init = async (): Promise<Bot> => {
  bot.listen().then(() => {
    console.log(`${doc.logging.info} Logged in!`);
  }).catch((error) => {
    console.error(doc.logging.error, error.toString());
  });
  return bot;
};

export { init };
