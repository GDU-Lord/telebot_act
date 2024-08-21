import TelegramBot from "node-telegram-bot-api";
import { ExtendedQuery } from "../core/listener.js";
import { mode, setup } from "../commands/setup.js";

export function getState(msg: TelegramBot.Message | ExtendedQuery<any>) {
  return setup.getState(msg.from?.id)?.state ?? null;
}

export function setStateMode(msg: TelegramBot.Message | ExtendedQuery<any>, md: mode) {
  const state = setup.getState(msg.from?.id)?.state!;
  state.mode = md;
}

export function getBottom<T extends { [key: string]: any }> (o: T, path: string[]): unknown {
  const fragment = path.shift() as string;
  if(fragment == null) return o;
  return getBottom(o[fragment], path);
}

