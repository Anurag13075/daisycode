import { hc } from "hono/client";
import type { AppType } from "@daisycode/server";

const apiUrl = process.env.API_URL ?? "http://localhost:3000";

export const apiClient = hc<AppType>(apiUrl, {
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      return await fetch(input, init);
    } catch (error) {
      const message =
        error instanceof Error && /fetch|connect|ECONNREFUSED|Unable to connect/i.test(error.message)
          ? `Cannot reach DaisyCode server at ${apiUrl}. Start it with: bun run dev:server`
          : error instanceof Error
            ? error.message
            : "Network request failed";
      throw new Error(message);
    }
  },
});
