// Require the necessary discord.js classes
import { REST, Routes, Client, Events, GatewayIntentBits } from 'discord.js';

import serverChatCommand from './commands/serverchat.js'

const commandsMap = {
    'serverchat': serverChatCommand
}
const commands = [
    {
        'name': 'serverchat',
        'description': 'send message to server'
    }
]

function initTwoWayClient() {
    // Create a new client instance
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    // When the client is ready, run this code (only once)
    // We use 'c' for the event parameter to keep it separate from the already defined 'client'
    client.once(Events.ClientReady, c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
        client.commands = commandsMap;
    });

    client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isChatInputCommand()) return;
        console.log(interaction);
    });

    // Log in to Discord with your client's token
    client.login(process.env.DISCORD_TOKEN);
    registerCommands();
    return client;
}


function registerCommands() {
    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    // and deploy your commands!
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID, process.env.DISCORD_SERVER_ID),
                { body: commands },
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
}
export { initTwoWayClient }