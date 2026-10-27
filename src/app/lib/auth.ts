
import dns from "node:dns";


import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
dns.setServers(["8.8.8.8", "1.1.1.1"]);


const mongoUri = process.env.DATABASE_URL;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing in .env");
}

const client = new MongoClient(mongoUri);
const database = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(database, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
