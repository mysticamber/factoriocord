import Command from "../command.js";
import log from "../../logger.js";
export default class Admin extends Command {
  constructor(rcon: any) {
    super(rcon);
  }
  runCommand(interaction: any): void {
    try {
      const subcommand = interaction.options.data[0];
      switch (subcommand.name) {
        case "time": {
          this.handleTime(interaction);
          break;
        }
        case "version": {
          this.handleVersion(interaction);
          break;
        }
        case "stats": {
          this.handleStats(subcommand, interaction);
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

  getOption(paramName: string, subcommand: any): any {
    const param = subcommand.options.find(
      (option: any) => option.name === paramName
    );
    return param;
  }

  async handleTime(interaction: any) {
    this.rcon.send(`/time`);
    await interaction.reply({
      content: `${interaction.member.user.username} checked game time`,
    });
  }

  async handleVersion(interaction: any) {
    this.rcon.send(`/version`);
    await interaction.reply({
      content: `${interaction.member.user.username} checked game version`,
    });
  }

  async handleStats(subcommand: any, interaction: any) {
    const isCount = this.getOption("count", subcommand) !== undefined;
    const isPlayers = this.getOption("players", subcommand) !== undefined;
    if (isCount) {
      this.rcon.send(`/p o c`);
      await interaction.reply({
        content: `${interaction.member.user.username} is checking player count`,
      });
    } else if (isPlayers) {
      this.rcon.send(`/p o`);
      await interaction.reply({
        content: `${interaction.member.user.username} is checking online players`,
      });
    }
  }
}
