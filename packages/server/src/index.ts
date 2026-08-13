import "./env";

import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import sessions from "./routes/sessions";
import chat from "./routes/chat";
import {
  assertAnyProviderConfigured,
  getConfiguredDefaultModelId,
  getProviderAvailability,
} from "./lib/models";

const app = new Hono();

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json(
      {
        error: error.message || "Request failed",
      },
      error.status,
    );
  }

  console.error("Unhandled server error", error);
  const message =
    error instanceof Error && error.message
      ? error.message
      : "Internal server error";
  return c.json({ error: message }, 500);
});

app.get("/health", (c) => {
  const providers = getProviderAvailability();
  return c.json({
    ok: true,
    product: "DaisyCode",
    providers,
    defaultModel: getConfiguredDefaultModelId(),
    ready: providers.opencode || providers.grok || providers.cerebras,
  });
});

app.get("/providers", (c) => {
  try {
    assertAnyProviderConfigured();
  } catch (error) {
    return c.json(
      {
        error: error instanceof Error ? error.message : String(error),
        providers: getProviderAvailability(),
        defaultModel: getConfiguredDefaultModelId(),
      },
      503,
    );
  }

  return c.json({
    providers: getProviderAvailability(),
    defaultModel: getConfiguredDefaultModelId(),
  });
});

const routes = app.route("/sessions", sessions).route("/chat", chat);

export type AppType = typeof routes;

console.log(
  `[DaisyCode] providers: ${JSON.stringify(getProviderAvailability())} default=${getConfiguredDefaultModelId()}`,
);

// idleTimeout must be high, otherwise LLM tool calls might not complete
export default { port: 3000, fetch: app.fetch, idleTimeout: 255 };
