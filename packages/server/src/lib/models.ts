import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  findSupportedChatModel,
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

let opencodeClient: OpenCodeClient | null = null;

function getOpenCodeClient(): OpenCodeClient {
  if (opencodeClient) {
    return opencodeClient;
  }

  const apiKey = process.env.OPENCODE_API_KEY;
  if (!apiKey) {
    throw new Error("OPENCODE_API_KEY environment variable is required");
  }

  opencodeClient = createOpenAICompatible({
    name: "opencode",
    baseURL: "https://opencode.ai/zen/v1",
    apiKey,
  });

  return opencodeClient;
}

function resolveOpenCodeModel(model: SupportedChatModel): ResolvedModel {
  return {
    model: getOpenCodeClient().chatModel(model.apiModelId),
    provider: "opencode",
    modelId: model.id,
  };
}

export function isSupportedChatModel(modelId: string): modelId is SupportedChatModelId {
  return findSupportedChatModel(modelId) != null;
}

export function resolveChatModel(modelId: string): ResolvedModel {
  const model = findSupportedChatModel(modelId);
  if (!model) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  return resolveOpenCodeModel(model);
}
