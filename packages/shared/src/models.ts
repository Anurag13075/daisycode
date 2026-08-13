export type SupportedProvider = "opencode";

type SupportedChatModelDefinition = {
  id: string;
  label: string;
  provider: SupportedProvider;
  /** Model id sent to the OpenCode Zen API (without the `opencode/` prefix). */
  apiModelId: string;
};

/**
 * Free OpenCode Zen models only.
 * Config-style ids use the `opencode/<name>` form; the API receives `<name>`.
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
] as const satisfies readonly SupportedChatModelDefinition[];

export type SupportedChatModel = (typeof SUPPORTED_CHAT_MODELS)[number];
export type SupportedChatModelId = SupportedChatModel["id"];

export function findSupportedChatModel(modelId: string) {
  return SUPPORTED_CHAT_MODELS.find((model) => model.id === modelId);
}

export const DEFAULT_CHAT_MODEL_ID: SupportedChatModelId =
  "opencode/deepseek-v4-flash-free";
