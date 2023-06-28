const SERVERINFO = {
  name: "serverinfo",
  description: "Check server things",
  options: [
    {
      name: "time",
      description: "Check current game length",
      type: 1,
    },
    {
      name: "version",
      description: "Check current game length",
      type: 1,
    },
    {
      name: "stats",
      description: "Check player count",
      type: 2,
      options: [
        {
          name: "count",
          description: "Check current game length",
          type: 1,
        },
        {
          name: "players",
          description: "Check current game length",
          type: 1,
        },
      ],
    },
  ],
};
const ADMIN = {
  name: "admin",
  description: "admin Controls",
  options: [
    {
      name: "init",
      description: "Initialize",
      type: 1,
    },
    {
      name: "gamespeed",
      description: "Promote Player",
      type: 1,
      options: [
        {
          name: "speed",
          description: "In Game Name",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "promote",
      description: "Promote Player",
      type: 1,
      options: [
        {
          name: "name",
          description: "In Game Name",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "demote",
      description: "Demote Player",
      type: 1,
      options: [
        {
          name: "name",
          description: "In Game Name",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "trustlist",
      description: "Run Trustlist",
      type: 1,
    },
  ],
};
const PLAYER = {
  name: "player",
  description: "Player Controls",
  options: [
    {
      name: "trust",
      description:
        "Trust Player - This works - BB code can be updated for proper output",
      type: 1,
      options: [
        {
          name: "name",
          description: "In Game Name",
          type: 3,
          required: true,
        },
      ],
    },

    {
      name: "untrust",
      description:
        "Untrust Player - This works - BB code can be updated for proper output",
      type: 1,
      options: [
        {
          name: "name",
          description: "In Game Name",
          type: 3,
          required: true,
        },
      ],
    },

    {
      name: "ban",
      description: "Ban Player",
      type: 1,
      options: [
        {
          name: "name",
          description: "In Game Name",
          type: 3,
          required: true,
        },
        {
          name: "reason",
          description: "Reason",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "unban",
      description: "Unban Player",
      type: 1,
      options: [
        {
          name: "name",
          description: "In Game Name",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "jail",
      description:
        "[WIP] - Jail Player - BB code needs updating for this to work",
      type: 1,
      options: [
        {
          name: "name",
          description: "In Game Name",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "free",
      description:
        "[WIP] - Free Player - BB code needs updating for this to work",
      type: 1,
      options: [
        {
          name: "name",
          description: "In Game Name",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "mute",
      description: "Mute Player",
      type: 1,
      options: [
        {
          name: "name",
          description: "In Game Name",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "unmute",
      description: "Unmute Player",
      type: 1,
      options: [
        {
          name: "name",
          description: "In Game Name",
          type: 3,
          required: true,
        },
      ],
    },
  ],
};
const COMMANDS = [
  {
    name: "chat",
    type: 1,
    description: "Chat back to server",
    options: [
      {
        name: "message",
        description: "message to send in game",
        type: 3,
        required: true,
      },
    ],
  },
  SERVERINFO,
  ADMIN,
  PLAYER,
];

export default COMMANDS;
