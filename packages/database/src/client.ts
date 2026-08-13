import dotenv from "dotenv";
import path from "path";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../generated/prisma/client.ts";

dotenv.config({
  path: path.resolve(import.meta.dirname, "../../../.env"),
  quiet: true,
});

const defaultDatabaseUrl = `file:${path.resolve(import.meta.dirname, "../prisma/daisycode.db")}`;
const databaseUrl = process.env.DATABASE_URL?.trim() || defaultDatabaseUrl;

const adapter = new PrismaLibSql({
  url: databaseUrl,
});

const globalForPrisma = globalThis as unknown as {
  daisycodePrisma?: PrismaClient;
};

export const db =
  globalForPrisma.daisycodePrisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.daisycodePrisma = db;
}
