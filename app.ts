import { spawnTailProcess } from "./src/tail.js";
import { config } from "dotenv";
// @ts-ignore
import express from "express";
import log from "./src/logger.js";
import {
  axiosInit,
  sendMessage,
  formatEmbedMessages,
  registerCommands,
} from "./src/discordApiClient.js";
import ReadyRcon from "./src/rcon.js";
import GatewayClient from "./src/gatewayClient.js";
// Init
log.info("TO EXIT, TYPE EXIT AND PRESS ENTER. DO NOT USE CTRL+C");
log.info("App Started");

// Env
config();
log.info("Config: Loaded");

// API Client
const app = express();
app.use(express.json());
axiosInit();
if (process.env.REREGISTER_COMMANDS === "true") {
  log.info("Discord: Registering Commands");
  registerCommands();
}
const tailProcess: any = spawnTailProcess(); // log tail
log.info("Discord: API Client Loaded");

let rconn: any;
// Rcon
if (process.env.RCON_ENABLED === "true") {
  rconn = new ReadyRcon();
  log.info("Factorio: Rcon Loaded");
} else {
  log.info("Rcon feature disabled in .env");
  sendMessage(
    process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
    formatEmbedMessages(
      "Cannot Start Rcon. The feature is disabled in .env",
      "EXIT",
      true
    )
  );
}

// Two Way Client
const discordGatewayClient = new GatewayClient(rconn);

// Exit cleanups
process.on("exit", () => {
  log.info("App Exit");
  handleExit();
});

process.on("SIGINT", () => {
  log.info("EXIT CLEANLY NEXT TIME BY TYPING EXIT AND PRESSING ENTER");
  sendMessage(
    process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
    formatEmbedMessages(
      "Exit cleanly next time by entering *exit* :angry:",
      "RED",
      true
    )
  ).then(() => {
    handleExit();
    process.exit();
  });
});

process.stdin.on("data", (input) => {
  const data = input.toString().trim().toUpperCase();
  if (data === "EXIT") {
    log.info("App Exit was triggered by user");
    sendMessage(
      process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
      formatEmbedMessages("Birdie flew away :angel:", "BLUE", true)
    ).then(() => {
      handleExit();
      process.exit();
    });
  } else if (data === "RCON") {
    sendMessage(
      process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
      formatEmbedMessages("Attempting to Reconnect to RCON", "BLUE", true)
    );
    // rconn = connectToRcon();
  } else if (data === "COMMANDS") {
    registerCommands();
  }
});

function handleExit() {
  try {
    if (rconn) {
      // log.info("RCON: Disconnecting");
      // rconn.disconnect();
    }
    if (discordGatewayClient) {
      log.info("DISCORD: disconnecting");
      discordGatewayClient.destroy();
    }

    log.info("TAIL: disconnecting");
    tailProcess.kill();
  } catch (error) {
    log.error(error);
  }
}
