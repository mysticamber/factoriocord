import Command from "../command.js";
import log from "../../logger.js";
export default class Admin extends Command {
  constructor(rcon: any) {
    super(rcon);
  }
  runCommand(interaction: any): void {
    try {
      const messageObj = interaction.options.data[0];
      this.handleChat(messageObj, interaction);
    } catch (e) {
      log.error(e);
    }
  }

  async handleChat(messageObj: any, interaction: any) {
    const message = messageObj.value.replace(/[^a-zA-Z0-9?', ]/gi);
    const content = `${interaction.member.user.username}: ${message}`;
    this.rcon.send(
      `/silent-command game.print(\"[color=yellow][[DISCORD]] ${content}[/color]\")`
    );
    await interaction.reply({
      content,
    });
  }
}
