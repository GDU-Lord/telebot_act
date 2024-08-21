import TelegramBot from "node-telegram-bot-api";
import { hideButton } from "../commands/index.js";
import { ExtendedQuery, MessageListener, QueryListener } from "../core/listener.js";
import MessageEmitter from "../core/message.js";
import { chain, responseTarget } from "../core/response.js";
import { mode, setup } from "../commands/setup.js";

export function setMode(md: mode) {
  return async function (input: TelegramBot.Message | ExtendedQuery<any>) {
    const state = setup.getState(input.from?.id)!.state;
    state.mode = md;
    return chain.on;
  };
}

export function verifyMode(md: mode, positive: chain, negative: chain) {
  return async function(input: TelegramBot.Message | ExtendedQuery<any>) {
    const state = setup.getState(input.from?.id)!.state;
    console.log(state.mode, "VERIFY MODE");
    if(md === mode.ANY || state.mode === md)
      return positive;
    return negative;
  }
}

export function setData<msg extends (TelegramBot.Message | ExtendedQuery<any>) = TelegramBot.Message>(key: string, data: (msg: msg, meta?: TelegramBot.Metadata) => any) {
  return async function (msg: msg, meta?: TelegramBot.Metadata) {
    const state = setup.getState(msg.from?.id)!.state;
    state.data[key] = await data(msg, meta);
    return chain.on;
  };
}

export function breakChain() {
  return async function () {
    return chain.break;
  }
}