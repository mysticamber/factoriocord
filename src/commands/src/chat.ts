import Command from "../command.js";

export default class Chat extends Command {
  constructor(rcon: any) {
    super(rcon);
  }
  runCommand(interaction: any): void {
    interaction.reply("chat")
  }
}