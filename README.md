# Setup
- Run npm install
- `cp template/.env .env`
- Add/Replace .env values as required

# TODO
- Graceful handling of when RCON is disabled
- Toggle Gateway Client (e.g. Just want to output log to discord, no two-way comms)
- Update start command to use ts friendly tools like tsc-watch
- server start command
- server update command
- scenario update command
- perma trust command
- Jail commands needs an update to accept reason param

# Discord API client

- Handles the log tail data
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

## How to Add a new top-level command

- Declare an `Application Command` in `commands.ts`. See [Discord API docs](https://discord.com/developers/docs/interactions/application-commands#application-command-object) for specs.
- Create a `Command` class in `commands/data`.
- Add command in `instantiateCommands` in `gatewayClient.ts`

```js
this.commands.set("command-name", new Command());
```

## Application Command Templates

You can declare an `Application Command` using json

References:

- See [Subcommands](https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups)
- See [Types](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types)

`/command`

```json
{
  "name": "command-name",
  "description": "description of the command",
  "type": 1 // See Application Command Types - 1 is CHAT_INPUT
}
```

`/command parameter1`

```json
{
  "name": "command-name",
  "description": "description of the command",
  "type": 1, // See Application Command Types - 1 is CHAT_INPUT
  "options": [
    {
      "name": "parameter-name",
      "description": "Parameter",
      "type": 3, // See Application Command Types - 3 is String
      "required": true
    }
  ]
}
```

`/command subcommand parameter1`

```json
{
  "name": "command-name",
  "description": "description of the command",
  "type": 1, // See Application Command Types - 1 is CHAT_INPUT
  "options": [
    {
      "name": "subcommand-name",
      "description": "description",
      "type": 1, // 1 is type SUB_COMMAND
      "options": [
        {
          "name": "parameter-name",
          "description": "Parameter",
          "type": 3, // 3 is String
          "required": true
        }
      ]
    }
  ]
}
```

`/command subcommand-group subcommand parameter1`

```json
{
  "name": "command-name",
  "description": "description of the command",
  "type": 1, // See Application Command Types - 1 is CHAT_INPUT
  "options": [
    {
      "name": "subcommand-group-name",
      "description": "description",
      "type": 2, // 2 is type SUB_COMMAND_GROUP - See Application Command Option Type
      "options": [
        {
          "name": "subcommand-name",
          "description": "description",
          "type": 1, // 1 is type SUB_COMMAND
          "options": [
            {
              "name": "parameter-name",
              "description": "Parameter",
              "type": 3, // 3 is String
              "required": true
            }
          ]
        },
        {
          "name": "edit",
          "description": "Edit permissions for a user",
          "type": 1
        }
      ]
    }
  ]
}
```
