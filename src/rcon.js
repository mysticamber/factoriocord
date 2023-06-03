
import Rcon from 'rcon'
import log from './logger.js';
import { sendMessage, formatEmbedMessages } from './discordApiClient.js'

function connectToRcon() {
    let retries = 0;
    if (process.env.RCON_ENABLED) {
        const rconn = new Rcon(process.env.FACTORIO_RCON_IP, process.env.FACTORIO_RCON_PORT, process.env.FACTORIO_RCON_PASSWORD);
        rconn.on('auth', function () {
            retries=0
            log.info("Rcon Opened!");
            sendMessage(process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
                formatEmbedMessages(":saluting_face: Factorio Command Centre Connected - Hut, 2, 3, 4! :saluting_face:", "GREEN", true))
        }).on('response', function (str) {
            if (str.length > 0) {
                sendMessage(process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
                    formatEmbedMessages(`Factorio Command Centre: ${str}`, "GREEN", true))
            }
            log.debug(str)
        }).on('end', function () {
            sendMessage(process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
                formatEmbedMessages(":stop_sign: Factorio Command Centre - STOPPED :stop_sign:", "RED", true))
            log.warn("Rcon closed!");
        }).on('error', function (e) {
            if (retries === 3) {
                sendMessage(process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
                    formatEmbedMessages(`:bangbang: Factorio Command Centre - CRASHED :bangbang: - ${e}`, "RED", true))
                log.error(`Rcon error: ${e}`);
            }
            else {
                retries = retries + 1;
                rconn.connect();
            }

        });
        log.info("Rcon is Starting");
        rconn.connect();
        return rconn;
    } else {
        log.info("Rcon feature disabled in .env")
        sendMessage(process.env.DISCORD_CHANNEL_ID_ADMIN_COMMANDS,
            formatEmbedMessages("Cannot Start Rcon. The feature is disabled in .env", "EXIT", true))
    }

}


export { connectToRcon }