import { mode, setup } from "../commands/setup.js";
import MessageEmitter from "../core/message.js";
import { ButtonDeleteOption } from "../core/options/button.js";
import { responseTarget, QueryResponse, chain } from "../core/response.js";
import { setMode } from "../custom/hooks.js";

export const hideButton = new ButtonDeleteOption("Hide", null, false)
  .setCallback(async () => true);

export const emitCancel = new MessageEmitter(setup, "Command canceled!", responseTarget.LOCAL)
  .addOption(hideButton);

export const responseCancel = new QueryResponse(async () => true, setup, emitCancel, 2)
  .next(setMode(mode.NONE))
  .next(async (msg) => {
    return chain.on;
  });

export const cancelButton = new ButtonDeleteOption("Cancel")
  .setResponse(responseCancel);