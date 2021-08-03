import { config } from "dotenv";
import { Bot } from "./bot/bot";

config();

let bot = new Bot();
bot.listen().then(() => {
  console.log('Logged in!')
}).catch((error) => {
  console.log('Oh no! ', error)
});