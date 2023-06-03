import { spawnTailProcess } from './src/tail.js';
import { config } from 'dotenv';
import express from 'express';
import log from './src/logger.js';
import { axiosInit, sendMessage, formatEmbedMessages } from './src/discordApiClient.js'
import { connectToRcon } from './src/rcon.js';
import { initTwoWayClient } from './src/gatewayClient.js';
// Init
log.info("TO EXIT, TYPE EXIT AND PRESS ENTER. DO NOT USE CTRL+C")
log.info("App Started")

// Env
config();
log.info("Config Loaded")

// API Client
const app = express();
app.use(express.json());
axiosInit();
let tailProcess = spawnTailProcess(log); // log tail
log.info("Discord API Client Loaded")

//Rcon
let rconn = connectToRcon();
log.info("Rcon Loaded")




// Two Way Client
let discordTwoWayClient = initTwoWayClient();


// Exit cleanups
process.on('exit', () => {
  log.info("App Exit")
  handleExit()
});

process.on('SIGINT', () => {
  log.info("EXIT CLEANLY NEXT TIME BY TYPING EXIT AND PRESSING ENTER")
  sendMessage(process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS, formatEmbedMessages("Exit cleanly next time by entering *exit* :angry:", "RED", true)).then(() => {
    handleExit()
    process.exit();
  })

});

process.stdin.on("data", data => {
  data = data.toString().trim().toUpperCase()
  if (data === 'EXIT') {
    log.info("App Exit was triggered by user")
    sendMessage(process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS, formatEmbedMessages("Birdie flew away :angel:", "BLUE", true)).then(() => {
      handleExit();
      process.exit();
    })
  } else if (data === 'RCON') {
    sendMessage(process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS, formatEmbedMessages("Attempting to Reconnect to RCON", "BLUE", true));
    rconn = connectToRcon();
  }
})
function handleExit() {
  try {
    log.info("rcon disconnecting")
    rconn.disconnect();
    log.info("discord disconnecting")
    discordTwoWayClient.destroy();
    log.info("tail disconnecting")
    tailProcess.kill();
  } catch (error) {
    log.error(error)
  }
}