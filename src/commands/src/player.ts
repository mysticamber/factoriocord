import Command from "../command.js";

export default class Player extends Command {
  constructor(rcon: any) {
    super(rcon);
  }
  runCommand(interaction: any): void {
    interaction.reply("player")
  }
}
