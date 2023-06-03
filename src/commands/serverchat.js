import SlashCommandBuilder from 'discord.js'

export default function serverChatCommand() {
    return {
        data: new SlashCommandBuilder()
            .setName('serverchat')
            .setDescription('Send messages to the server!'),
        async execute(interaction) {
            await interaction.reply('Pong!');
        },
    }
}
export { serverChatCommand }
