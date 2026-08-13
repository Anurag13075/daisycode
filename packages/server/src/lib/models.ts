import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createXai } from "@ai-sdk/xai";
import { createCerebras } from "@ai-sdk/cerebras";
import {
  findSupportedChatModel,
  resolveDefaultChatModelId,
  type ProviderAvailability,
  type SupportedChatModel,
  type SupportedChatModelId,
  type SupportedProvider,
} from "@daisycode/shared";
import type { LanguageModel } from "ai";

export type ResolvedModel = {
  model: LanguageModel;
  provider: SupportedProvider;
  modelId: SupportedChatModelId;
};

type OpenCodeClient = ReturnType<typeof createOpenAICompatible>;
type XaiClient = ReturnType<typeof createXai>;
type CerebrasClient = ReturnType<typeof createCerebras>;

let opencodeClient: OpenCodeClient | null = null;
let xaiClient: XaiClient | null = null;
let cerebrasClient: CerebrasClient | null = null;

function getOpenCodeApiKey() {
  return process.env.OPENCODE_API_KEY?.trim() || null;
}

function getGrokApiKey() {
  return process.env.XAI_API_KEY?.trim() || process.env.GROK_API_KEY?.trim() || null;
}

function getCerebrasApiKey() {
  return process.env.CEREBRAS_API_KEY?.trim() || null;
}

export function getProviderAvailability(): ProviderAvailability {
  return {
    opencode: Boolean(getOpenCodeApiKey()),
    grok: Boolean(getGrokApiKey()),
    cerebras: Boolean(getCerebrasApiKey()),
  };
}

export function getConfiguredDefaultModelId(): SupportedChatModelId {
  return resolveDefaultChatModelId(getProviderAvailability());
}

export function assertAnyProviderConfigured() {
  const availability = getProviderAvailability();
  if (availability.opencode || availability.grok || availability.cerebras) {
    return;
  }

  throw new Error(
    "No AI provider API key configured. Set at least one of OPENCODE_API_KEY, XAI_API_KEY (or GROK_API_KEY), or CEREBRAS_API_KEY in .env.",
  );
}

function missingKeyMessage(provider: SupportedProvider) {
  switch (provider) {
    case "opencode":
      return "OPENCODE_API_KEY is not set. Add it to .env, or switch to a Grok/Cerebras model.";
    case "grok":
      return "XAI_API_KEY (or GROK_API_KEY) is not set. Add it to .env, or switch to an OpenCode/Cerebras model.";
    case "cerebras":
      return "CEREBRAS_API_KEY is not set. Add it to .env, or switch to an OpenCode/Grok model.";
  }
}

function getOpenCodeClient(): OpenCodeClient {
  const apiKey = getOpenCodeApiKey();
  if (!apiKey) {
    throw new Error(missingKeyMessage("opencode"));
  }

  if (!opencodeClient) {
    opencodeClient = createOpenAICompatible({
      name: "opencode",
      baseURL: "https://opencode.ai/zen/v1",
      apiKey,
    });
  }

  return opencodeClient;
}

function getXaiClient(): XaiClient {
  const apiKey = getGrokApiKey();
  if (!apiKey) {
    throw new Error(missingKeyMessage("grok"));
  }

  if (!xaiClient) {
    xaiClient = createXai({ apiKey });
  }

  return xaiClient;
}

function getCerebrasClient(): CerebrasClient {
  const apiKey = getCerebrasApiKey();
  if (!apiKey) {
    throw new Error(missingKeyMessage("cerebras"));
  }

  if (!cerebrasClient) {
    cerebrasClient = createCerebras({ apiKey });
  }

  return cerebrasClient;
}

function resolveProviderModel(model: SupportedChatModel): ResolvedModel {
  switch (model.provider) {
    case "opencode":
      return {
        model: getOpenCodeClient().chatModel(model.apiModelId),
        provider: "opencode",
        modelId: model.id,
      };
    case "grok":
      return {
        // Chat Completions path is more compatible for tool-calling coding agents.
        model: getXaiClient().chat(model.apiModelId),
        provider: "grok",
        modelId: model.id,
      };
    case "cerebras":
      return {
        model: getCerebrasClient()(model.apiModelId),
        provider: "cerebras",
        modelId: model.id,
      };
  }
}

export function isSupportedChatModel(modelId: string): modelId is SupportedChatModelId {
  return findSupportedChatModel(modelId) != null;
}

export function resolveChatModel(modelId: string): ResolvedModel {
  const model = findSupportedChatModel(modelId);
  if (!model) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  return resolveProviderModel(model);
}
