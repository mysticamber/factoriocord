// @ts-ignore
import Rcon from "rcon";
import log from "./logger.js";
import { sendMessage, formatEmbedMessages } from "./discordApiClient.js";

export default class ReadyRcon {
  rcon: Rcon;
  constructor() {
    let retries = 0;
    this.rcon = new Rcon(
      process.env.FACTORIO_RCON_IP,
      process.env.FACTORIO_RCON_PORT,
      process.env.FACTORIO_RCON_PASSWORD
    );
    this.rcon
      .on("auth", () => {
        retries = 0;
        log.info("Rcon Opened!");
        sendMessage(
          process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
          formatEmbedMessages(
            ":saluting_face: Factorio Command Centre Connected - Hut, 2, 3, 4! :saluting_face:",
            "GREEN",
            true
          )
        );
      })
      .on("response", (str: any) => {
        if (str.length > 0) {
          sendMessage(
            process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
            formatEmbedMessages(
              `Factorio Command Centre: ${str}`,
              "GREEN",
              true
            )
          );
        }
        log.debug(str);
      })
      .on("end", () => {
        sendMessage(
          process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
          formatEmbedMessages(
            ":stop_sign: Factorio Command Centre - STOPPED :stop_sign:",
            "RED",
            true
          )
        );
        log.warn("Rcon closed!");
      })
      .on("error", (e: any) => {
        if (retries === 3) {
          sendMessage(
            process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
            formatEmbedMessages(
              `:bangbang: Factorio Command Centre - CRASHED :bangbang: - ${e}`,
              "RED",
              true
            )
          );
          log.error(`Rcon error: ${e}`);
        } else {
          retries = retries + 1;
          this.rcon.connect();
        }
      });
    log.info("Rcon is Starting");
    this.rcon.connect();
  }
  send(data: any) {
    return this.rcon.send(data);
  }
  disconnect() {
    this.rcon.disconnect();
  }
}
