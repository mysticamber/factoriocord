import Command from "../command.js";
import log from "../../logger.js";
export default class Admin extends Command {
  MESSAGES: Map<string, string>;

  constructor(rcon: any) {
    super(rcon);
    this.MESSAGES = new Map<string, string>();
    this.MESSAGES.set("ban", "banned");
    this.MESSAGES.set("unban", "unbanned");
    this.MESSAGES.set("mute", "muted");
    this.MESSAGES.set("unmute", "unmuted");
    this.MESSAGES.set("trust", "trusted");
    this.MESSAGES.set("untrust", "untrusted");
    this.MESSAGES.set("jail", "jailed");
    this.MESSAGES.set("free", "freed");
  }
  runCommand(interaction: any): void {
    try {
      const subcommand = interaction.options.data[0];
      switch (subcommand.name) {
        case "ban":
        case "unban":
        case "trust":
        case "untrust":
        case "mute":
        case "jail":
        case "free":
        case "unmute": {
          this.handlePlayerAction(subcommand, interaction);
          break;
        }

        default: {
          super.handleDefault(interaction);
          break;
        }
      }
    } catch (e) {
      log.error(e);
    }
  }

  getParam(paramName: string, subcommand: any): any {
    const param = subcommand.options.find(
      (option: any) => option.name === paramName
    );
    return param.value;
  }

  async handlePlayerAction(subcommand: any, interaction: any) {
    const action = subcommand.name;
    const param = this.getParam("name", subcommand);
    const player = param.split("")[0];
    this.rcon.send(`/${action} ${player}`);
    const msg = `${interaction.member.user.username} ${this.MESSAGES.get(
      action
    )} ${player}`;

    await interaction.reply({
      content: msg,
    });
  }
}
