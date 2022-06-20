import { v4 as uuid } from "uuid";

//available job statuses
export const statusList = [
  "Scheduled",
  "Active",
  "Invoicing",
  "To priced",
  "Completed",
];

//Jobs collection
export const jobs = [
  {
    uuid: uuid(),
    jobId: "Electro-45D",
    status: "Scheduled",
    description: "Power outage",
    createdTimestamp: 1655697292,
    client: {
      firstName: "John",
      lastName: "Smith",
      phone: "+64 220 123456",
      address: {
        city: "Auckland",
        street: "50 Sea view",
        postCode: 1000,
      },
    },
    notes: [
      {
        uuid: uuid(),
        createdTimestamp: 1655700892,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris sit amet massa vitae. Gravida dictum fusce ut placerat orci.`,
      },
      {
        uuid: uuid(),
        createdTimestamp: 1655701012,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
      },
    ],
  },
  {
    uuid: uuid(),
    jobId: "Plumbing-23D4",
    status: "Invoicing",
    description: "Water leak",
    createdTimestamp: 1655704492,
    client: {
      firstName: "John",
      lastName: "Smith",
      phone: "+64 220 123456",
      address: {
        city: "Auckland",
        street: "42 Ocean view",
        postCode: 1000,
      },
    },
    notes: [],
  },
];
