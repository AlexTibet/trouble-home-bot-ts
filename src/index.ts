import { config } from 'dotenv';
import { Bot } from './bot/bot';
import { doc } from './config/documentation';

config();

const bot = new Bot(process.env.DISCORD_BOT_TOKEN);
bot.listen().then(() => {
  console.log(`${doc.logging.info} Logged in!`);
}).catch((error) => {
  console.error(doc.logging.error, error.toString());
});
