import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "prisma/config";

dotenv.config({
  path: path.resolve(import.meta.dirname, "../../.env"),
});

const defaultDatabaseUrl = `file:${path.resolve(import.meta.dirname, "prisma/daisycode.db")}`;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL?.trim() || defaultDatabaseUrl,
  },
});
