'bans',
reconnect
locationF

# Setup
Run npm install
```cp template/.env .env`
Replace values as required

# Discord API client
- Handles the log tail
- Sends messages to discord via http requests. 
- Best for sending messages to discord
- I isolated it so there's less chance of log disruption. 

# Gateway Client
- Handles two-way communication with discord (e.g. commands)
- Send messages to discord via Client from discord.js
- Updated version of what Hedwig used to be. 

# Commands
BB Code problems
- Trustlist - doesn't work if player not online
- Jail and Free are ready to be used, but it needs bb code change to work

## How to Add a new command

- Declare an `Application Command` in `commands.ts`. See [Discord API docs](https://discord.com/developers/docs/interactions/application-commands#application-command-object) for specs.
- Create a `Command` class in `commands/src`.
- Add command in `instantiateCommands` in `gatewayClient.ts`

```js
this.commands.set("name", new Command());
```
