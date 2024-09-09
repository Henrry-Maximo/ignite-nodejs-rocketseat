import "dotenv/config";

import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import type { Environment } from "vitest";
import { PrismaClient } from "@prisma/client";

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);
  return url.toString();
}

// connection database
const prisma = new PrismaClient();

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    // deploy => jump verify
    execSync("npx prisma migrate deploy");

    // console.log("Setup!");
    return {
      async teardown() {
        // console.log("Teardown!");

        // operation delete schema at cascade
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );

        // closed connection database
        await prisma.$disconnect();
      },
    };
  },
};
