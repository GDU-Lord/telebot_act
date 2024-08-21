import TelegramBot from "node-telegram-bot-api";
import BotSetup from "../core/botSetup.js";
import "dotenv/config.js";

export enum mode {
  NONE = "NONE",
  ANY = "ANY",
};

const bot = new TelegramBot(
  process.env.TOKEN as string,
  {
    polling: {
      interval: 2000,
      params: {
        allowed_updates: ["chat_member", "message", "chat_join_request", "callback_query", "chat_member_updated"]
      }
    }
  }
);

export interface state {
  mode: mode;
  data: {
    [key: string]: any;
  };
}

export const setup = new BotSetup<state>(bot, {
  mode: mode.NONE,
  data: {},
}, {
  sendMessageOptions: {
    parse_mode: "HTML",
  }
});