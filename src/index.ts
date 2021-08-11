import { config } from "dotenv";
import { Bot } from "./bot/bot";

config();

let bot = new Bot();
bot.listen().then(() => {
  console.log('Logged in!')
}).catch((error) => {
  console.error('Oh no! ', error)
});