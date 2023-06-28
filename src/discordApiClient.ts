import axios from "axios";
import axiosRetry from "axios-retry";
import log from "./logger.js";
import COMMANDS from "./commands/commands.js";
import EMBED_COLOR from "./constants/color.js";
function axiosInit() {
  log.info("Axios was setup");
  axios.defaults.headers.common = {
    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    "Content-Type": "application/json; charset=UTF-8",
    "User-Agent": "DiscordBot (https://biterbattles.org, 1.0.0)",
  };

  // Configure Axios retries
  axiosRetry(axios, {
    retries: 3, // Number of retries
    retryDelay: (retryCount) => retryCount * 1000, // Delay between retries (in milliseconds)
    shouldResetTimeout: true, // Reset timeout on retries
    retryCondition: (error) => error.response && error.response.status === 429, // Retry only on 429 Too Many Requests
  });
}

async function sendMessage(channelId: string, content: any) {
  try {
    const url = `${process.env.DISCORD_URL}/channels/${channelId}/messages`;
    const res = await axios.post(url, content);
    log.debug(res);
  } catch (error) {
    log.error("Error sending message to Discord:", error);
  }
}

function formatEmbedMessages(line: string, token: string, skipSlice = false) {
  try {
    const slicedLine = skipSlice
      ? line
      : line.slice(line.indexOf(token) + token.length).replace(/\\n/gi, "\n");

    const embedMessage = {
      type: "rich",
      timestamp: new Date().toISOString(),
      color: getEmbedColor(token),
      fields: [
        {
          name: "System",
          value: slicedLine,
        },
      ],
    };

    return { embeds: [embedMessage] };
  } catch (error) {
    log.error("ERROR: error parsing message for embed", error);
  }
}
function formatRegularMessage(message: string) {
  return { content: message };
}
function getEmbedColor(token: string) {
  return EMBED_COLOR.get(token)
    ? parseInt(EMBED_COLOR.get(token).substring(1), 16)
    : 2844409;
}

async function registerCommands() {
  try {
    const url = `${process.env.DISCORD_URL}/applications/${process.env.DISCORD_APPLICATION_ID}/guilds/${process.env.DISCORD_SERVER_ID}/commands`;
    const res = await axios.put(url, COMMANDS);
  } catch (error) {
    log.error("Error sending message to Discord:", error);
    log.error(error.toJSON());
  }
}

export {
  axiosInit,
  sendMessage,
  formatEmbedMessages,
  formatRegularMessage,
  getEmbedColor,
  registerCommands,
};
