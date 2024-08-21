import { setup } from "./commands/setup.js";
import { MessageListener } from "./core/listener.js";

async function setupListeners() {

  const onMessage = new MessageListener(setup, async (msg) => {
    console.log(msg.text);
  });

  const me = await setup.bot.getMe();

  console.log("setup", me.id);

}

export function init() {
  setTimeout(() => setupListeners(), +process.env.STARTUP_TIMEOUT!);
}

init();