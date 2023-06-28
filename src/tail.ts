import { Tail } from "tail";
import { spawn } from "child_process";
import {
  sendMessage,
  formatRegularMessage,
  formatEmbedMessages,
} from "./discordApiClient.js";
import log from "./logger.js";

const TOKENS = {
  PLAYER_CHAT: "[PLAYER-CHAT]",
  BOLD: "[DISCORD-BOLD]",
  EMBED: "[DISCORD-EMBED]",
  DATA_SET: "[DATA-SET]",
  DATA_GET: "[DATA-GET]",
  PLAYER_JOIN: "[PLAYER-JOIN]",
  PLAYER_LEAVE: "[PLAYER-LEAVE]",
  PLAYER_JAILED: "{Jailed}",
};

function spawnTailProcess() {
  const tailCommand = "tail";
  const tailArgs = ["-f", process.env.FACTORIO_LOG_LOCATION];
  try {
    // Run tails
    const tailProcess = spawn(tailCommand, tailArgs);
    log.info("Tail started");

    // Actually do stuff with the tail
    const tail = new Tail(process.env.FACTORIO_LOG_LOCATION);
    tail.on("line", (data: string) => {
      formatAndSendMessage(data);
      log.debug(data);
    });

    tail.on("error", (error: any) => {
      log.error("ERROR", error);
    });

    return tailProcess;
  } catch (error) {
    log.error("ERROR", error);
  }
}

function sliceMessage(line: string, token: string) {
  try {
    return line.slice(line.indexOf(token) + token.length);
  } catch (error) {
    log.error("Error Parsing Line: ", error);
  }
}

function formatAndSendMessage(line: string) {
  let result;
  if (line.includes(TOKENS.PLAYER_CHAT)) {
    result = formatRegularMessage(sanitizeChat(line));
    sendMessage(process.env.DISCORD_CHANNEL_ID_CHAT, result);
  } else if (line.includes(TOKENS.BOLD)) {
    result = formatRegularMessage(
      "***" + sliceMessage(line, TOKENS.BOLD) + "***"
    );
    sendMessage(process.env.DISCORD_CHANNEL_ID_CHAT, result);
  } else if (line.includes(TOKENS.PLAYER_JOIN)) {
    result = formatRegularMessage(
      "***" +
        sliceMessage(line, TOKENS.PLAYER_JOIN) +
        "*** has landed. ╚(ಠ_ಠ)=┐"
    );
    sendMessage(process.env.DISCORD_CHANNEL_ID_CHAT, result);
  } else if (line.includes(TOKENS.PLAYER_LEAVE)) {
    result = formatRegularMessage(
      "***" +
        sliceMessage(line, TOKENS.PLAYER_LEAVE) +
        "*** left the game. ༼ つ ಥ_ಥ ༽つ"
    );
    sendMessage(process.env.DISCORD_CHANNEL_ID_CHAT, result);
  } else if (line.includes(TOKENS.PLAYER_JAILED)) {
    result = formatEmbedMessages(line, TOKENS.PLAYER_JAILED);
    sendMessage(process.env.DISCORD_CHANNEL_ID_ANNOUNCEMENTS, result);
  } else if (line.includes(TOKENS.EMBED)) {
    result = formatEmbedMessages(line, TOKENS.EMBED);
    sendMessage(process.env.DISCORD_CHANNEL_ID_ANNOUNCEMENTS, result);
  }
}

function sanitizeChat(line: string): string {
  try {
    const slicedLine = line
      .slice(line.indexOf(TOKENS.PLAYER_CHAT) + TOKENS.PLAYER_CHAT.length)
      ?.split(":");
    return (
      slicedLine[0] + ": " + slicedLine[1].replace(/[^a-zA-Z0-9?', ]/gi, "")
    );
  } catch (error) {
    log.error("Error Sanitizing Player Chat: ", error);
  }
}

export { spawnTailProcess };
