export type SupportedProvider = "opencode" | "grok" | "cerebras";

type SupportedChatModelDefinition = {
  id: string;
  label: string;
  provider: SupportedProvider;
  /** Model id sent to the provider API. */
  apiModelId: string;
};

/**
 * Free / free-tier models.
 * - OpenCode Zen free models (needs OPENCODE_API_KEY)
 * - xAI Grok models on free credits (needs XAI_API_KEY or GROK_API_KEY)
 * - Cerebras free-trial models (needs CEREBRAS_API_KEY)
 */
export const SUPPORTED_CHAT_MODELS = [
  {
    id: "opencode/deepseek-v4-flash-free",
    label: "DeepSeek V4 Flash Free",
    provider: "opencode",
    apiModelId: "deepseek-v4-flash-free",
  },
  {
    id: "opencode/mimo-v2.5-free",
    label: "MiMo V2.5 Free",
    provider: "opencode",
    apiModelId: "mimo-v2.5-free",
  },
  {
    id: "opencode/nemotron-3-ultra-free",
    label: "Nemotron 3 Ultra Free",
    provider: "opencode",
    apiModelId: "nemotron-3-ultra-free",
  },
  {
    id: "opencode/laguna-s-2.1-free",
    label: "Laguna S 2.1 Free",
    provider: "opencode",
    apiModelId: "laguna-s-2.1-free",
  },
  {
    id: "opencode/big-pickle",
    label: "Big Pickle",
    provider: "opencode",
    apiModelId: "big-pickle",
  },
  {
    id: "grok/grok-code-fast-1",
    label: "Grok Code Fast",
    provider: "grok",
    apiModelId: "grok-code-fast-1",
  },
  {
    id: "grok/grok-3-mini",
    label: "Grok 3 Mini",
    provider: "grok",
    apiModelId: "grok-3-mini",
  },
  {
    id: "grok/grok-4-1-fast-non-reasoning",
    label: "Grok 4.1 Fast",
    provider: "grok",
    apiModelId: "grok-4-1-fast-non-reasoning",
  },
  {
    id: "cerebras/gpt-oss-120b",
    label: "Cerebras GPT OSS 120B",
    provider: "cerebras",
    apiModelId: "gpt-oss-120b",
  },
  {
    id: "cerebras/gemma-4-31b",
    label: "Cerebras Gemma 4 31B",
    provider: "cerebras",
    apiModelId: "gemma-4-31b",
  },
  {
    id: "cerebras/llama3.1-8b",
    label: "Cerebras Llama 3.1 8B",
    provider: "cerebras",
    apiModelId: "llama3.1-8b",
  },
] as const satisfies readonly SupportedChatModelDefinition[];

export type SupportedChatModel = (typeof SUPPORTED_CHAT_MODELS)[number];
export type SupportedChatModelId = SupportedChatModel["id"];

export type ProviderAvailability = Record<SupportedProvider, boolean>;

export function findSupportedChatModel(modelId: string) {
  return SUPPORTED_CHAT_MODELS.find((model) => model.id === modelId);
}

export function getModelsForProvider(provider: SupportedProvider) {
  return SUPPORTED_CHAT_MODELS.filter((model) => model.provider === provider);
}

/**
 * Prefer OpenCode, then Grok, then Cerebras — whichever has a key configured.
 * Falls back to the first OpenCode model if nothing is configured yet.
 */
export function resolveDefaultChatModelId(
  availability: ProviderAvailability,
): SupportedChatModelId {
  const preferredProviders: SupportedProvider[] = ["opencode", "grok", "cerebras"];

  for (const provider of preferredProviders) {
    if (!availability[provider]) continue;
    const model = SUPPORTED_CHAT_MODELS.find((entry) => entry.provider === provider);
    if (model) return model.id;
  }

  return SUPPORTED_CHAT_MODELS[0]!.id;
}

/** Static fallback used before env/runtime availability is known. */
export const DEFAULT_CHAT_MODEL_ID: SupportedChatModelId =
  "opencode/deepseek-v4-flash-free";
