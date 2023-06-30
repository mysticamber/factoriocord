// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import Admin from "./commands/src/admin.js";
import log from "./logger.js";
import Chat from "./commands/src/chat.js";
import Player from "./commands/src/player.js";
import ServerInfo from "./commands/src/serverinfo.js";

export default class GatewayClient {
  client: Client;
  commands: Map<string, any>;
  constructor(rcon: any) {
    this.commands = new Map<string, any>();
    this.instantiateCommands(rcon);
    // Create a new client instance
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });

    this.client.once(Events.ClientReady, (c) => {
      log.log(`Ready! Logged in as ${c.user.tag}`);
    });

    this.client.on(Events.InteractionCreate, (interaction) => {
      if (interaction.isChatInputCommand()) {
        if (this.commands.has(interaction.commandName))
          this.commands.get(interaction.commandName).runCommand(interaction);
        else {
          interaction.reply("command WIP");
        }
      }
    });

    // Log in to Discord with your client's token
    this.client.login(process.env.DISCORD_TOKEN);
  }

  instantiateCommands(rcon: any) {
    this.commands.set("admin", new Admin(rcon));
    this.commands.set("chat", new Chat(rcon));
    this.commands.set("player", new Player(rcon));
    this.commands.set("serverinfo", new ServerInfo(rcon));
  }

  destroy() {
    this.client.destroy();
  }
}
