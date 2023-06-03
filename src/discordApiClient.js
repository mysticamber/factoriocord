import axios from 'axios'
import axiosRetry from 'axios-retry'
import log from './logger.js';
const EMBED_COLOR = {
    "[DISCORD-EMBED]": "#11BB11",
    "{Jailed}": "#FF0000",
    "RED": "#C64F38",
    "GREEN": "11BB11",
    "BLUE": "#797EF6"
}
function axiosInit() {
    log.info("Axios was setup")
    axios.defaults.headers.common = {
        "Authorization": `Bot ${process.env.DISCORD_TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        "User-Agent": 'DiscordBot (https://biterbattles.org, 1.0.0)'
    }

    // Configure Axios retries
    axiosRetry(axios, {
        retries: 3, // Number of retries
        retryDelay: (retryCount) => retryCount * 1000, // Delay between retries (in milliseconds)
        shouldResetTimeout: true, // Reset timeout on retries
        retryCondition: (error) => error.response && error.response.status === 429, // Retry only on 429 Too Many Requests
    });
}

async function sendMessage(channelId, content) {
    try {
        const url = `${process.env.DISCORD_URL}/channels/${channelId}/messages`
        const res = await axios.post(url, content);
        log.debug(res)
    } catch (error) {
        log.error('Error sending message to Discord:', error);
    }
}

function formatEmbedMessages(line, token, skipSlice = false) {
    try {

        let slicedLine = skipSlice ? line : line
            .slice(line.indexOf(token) + token.length)
            .replace(/\\n/gi, "\n");

        let embedMessage = {
            type: "rich",
            timestamp: new Date().toISOString(),
            color: getEmbedColor(token),
            fields: [{
                name: "System",
                value: slicedLine
            }]
        }

        return { embeds: [embedMessage] }
    } catch (error) {
        log.error("ERROR: error parsing message for embed", error);
    }
}
function formatRegularMessage(message) {
    return { content: message }
}
function getEmbedColor(token) {
    return EMBED_COLOR[token] ? parseInt(EMBED_COLOR[token].substr(1), 16) : 2844409
}

export { axiosInit, sendMessage, formatEmbedMessages, formatRegularMessage, getEmbedColor }
