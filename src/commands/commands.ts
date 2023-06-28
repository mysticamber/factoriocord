const COMMANDS = [
  {
    name: "healthcheck",
    type: 1,
    description: "Filo's Health Check.",
  },
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
  {
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
  },
  {
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
    ],
  },
  {
    name: "player",
    description: "Player Controls",
    options: [
      {
        name: "trust",
        description: "Trust Player",
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
        description: "Untrust Player",
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
    ],
  },
];

export default COMMANDS;
