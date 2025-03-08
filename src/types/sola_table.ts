/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/sola_table.json`.
 */
export type SolaTable = {
  "address": "GdFRCmL2NYrB42712pU45t8C9Uj1nKLYKzg8NjkrsPoK",
  "metadata": {
    "name": "solaTable",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createMeetup",
      "discriminator": [
        68,
        21,
        121,
        155,
        244,
        190,
        141,
        132
      ],
      "accounts": [
        {
          "name": "meetup",
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
      "name": "joinMeetup",
      "discriminator": [
        4,
        140,
        16,
        124,
        173,
        243,
        255,
        206
      ],
      "accounts": [
        {
          "name": "meetup",
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
      "name": "meetup",
      "discriminator": [
        201,
        72,
        148,
        178,
        188,
        166,
        181,
        174
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "meetupFull",
      "msg": "The meetup is full"
    },
    {
      "code": 6001,
      "name": "meetupExpired",
      "msg": "The meetup date has passed"
    }
  ],
  "types": [
    {
      "name": "meetup",
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
            "name": "currentParticipants",
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
      }
    }
  ]
};
