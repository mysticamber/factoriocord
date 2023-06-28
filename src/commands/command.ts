// @ts-ignore
import Rcon from "rcon";
export default abstract class Command {
  rcon: Rcon;
  constructor(rcon: any) {
    this.rcon = rcon;
  }
  abstract runCommand(interaction: any): void;
  handleDefault(interaction: any): void {
    interaction.reply("Filo doesn't know that command yet");
  }
}
