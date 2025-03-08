/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/sola_table.json`.
 */
export type SolaTable = {
  "address": "8pWTbsckvHvvRN71PZ4rV2y3kexmdgRgoxgPbWYRVxsi",
  "metadata": {
    "name": "solaTable",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createTable",
      "discriminator": [
        214,
        142,
        131,
        250,
        242,
        83,
        135,
        185
      ],
      "accounts": [
        {
          "name": "table",
          "writable": true,
          "signer": true
        },
        {
          "name": "organizer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "maxParticipants",
          "type": "u8"
        },
        {
          "name": "country",
          "type": "string"
        },
        {
          "name": "city",
          "type": "string"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "date",
          "type": "i64"
        },
        {
          "name": "category",
          "type": "string"
        },
        {
          "name": "imageUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "joinTable",
      "discriminator": [
        14,
        117,
        84,
        51,
        95,
        146,
        171,
        70
      ],
      "accounts": [
        {
          "name": "table",
          "writable": true
        },
        {
          "name": "participant",
          "signer": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "table",
      "discriminator": [
        34,
        100,
        138,
        97,
        236,
        129,
        230,
        112
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "tableFull",
      "msg": "The table is full"
    },
    {
      "code": 6001,
      "name": "tableExpired",
      "msg": "The table date has passed"
    },
    {
      "code": 6002,
      "name": "alreadyJoined",
      "msg": "Already joined this table"
    },
    {
      "code": 6003,
      "name": "organizerCannotJoin",
      "msg": "Organizer cannot join their own table"
    }
  ],
  "types": [
    {
      "name": "table",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "organizer",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "maxParticipants",
            "type": "u8"
          },
          {
            "name": "participants",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "country",
            "type": "string"
          },
          {
            "name": "city",
            "type": "string"
          },
          {
            "name": "location",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "date",
            "type": "i64"
          },
          {
            "name": "category",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          }
        ]
      }
    }
  ]
};
