import Command from "../command.js";
import log from "../../logger.js";
import TRUSTLIST from "../data/trustlist.js";

export default class Admin extends Command {
  constructor(rcon: any) {
    super(rcon);
  }
  runCommand(interaction: any): void {
    try {
      const subcommand = interaction.options.data[0];
      switch (subcommand.name) {
        case "promote":
          {
            this.handlePromote(subcommand, interaction);
          }
          break;
        case "demote": {
          this.handleDemote(subcommand, interaction);
          break;
        }
        case "init": {
          this.handleInit(subcommand, interaction);
          break;
        }
        case "gamespeed": {
          this.handleGameSpeed(subcommand, interaction);
          break;
        }
        case "trustlist": {
          this.handleTrustList(interaction);
          break;
        }
        case "reconnect": {
          this.handleReconnect(interaction);
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

  async handlePromote(subcommand: any, interaction: any) {
    const param = this.getParam("name", subcommand);
    this.rcon.send(`/promote ${param}`);
    await interaction.reply({
      content: `${interaction.member.user.username} promoted ${param}`,
    });
  }

  async handleDemote(subcommand: any, interaction: any) {
    const param = this.getParam("name", subcommand);
    this.rcon.send(`/demote ${param}`);
    await interaction.reply({
      content: `${interaction.member.user.username} demoted ${param}`,
    });
  }

  async handleGameSpeed(subcommand: any, interaction: any) {
    const param = this.getParam("speed", subcommand);
    this.rcon.send(`/c game.speed=${param}`);
    await interaction.reply({
      content: `${interaction.member.user.username} set Game Speed to ${param}`,
    });
  }

  async handleInit(data: any, interaction: any) {
    const dateTime = Math.floor(new Date().getTime() / 1000);
    this.rcon.send(
      `/silent-command local s = ServerCommands s = s and s.set_time(${dateTime})`
    );
    await interaction.reply({
      content: `${interaction.member.user.username} initialized the server. Set time to ${dateTime}`,
    });
  }

  async handleReconnect(interaction: any) {
    this.rcon.reconnect();
    await interaction.reply({
      content: `${interaction.member.user.username} attempted to revive birdie`,
    });
  }

  async handleTrustList(interaction: any) {
    // TODO - update it to just writing to the variable directly rather than calling trust multiple times
    let count = 0;
    TRUSTLIST.forEach((playerName) => {
      count++;
      this.rcon.send(`/trust ${playerName}`);
    });

    await interaction.reply({
      content: `${interaction.member.user.username} ran trust for player list count: ${count}`,
    });
  }
}
