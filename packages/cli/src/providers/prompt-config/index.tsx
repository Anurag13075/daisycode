import { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import {
  Mode,
  resolveDefaultChatModelId,
  type ModeType,
  type ProviderAvailability,
  type SupportedChatModelId,
} from "@daisycode/shared";

function readProviderAvailability(): ProviderAvailability {
  return {
    opencode: Boolean(process.env.OPENCODE_API_KEY?.trim()),
    grok: Boolean(process.env.XAI_API_KEY?.trim() || process.env.GROK_API_KEY?.trim()),
    cerebras: Boolean(process.env.CEREBRAS_API_KEY?.trim()),
  };
}

type PromptConfigContextValue = {
  mode: ModeType;
  toggleMode: () => void;
  setMode: (mode: ModeType) => void;
  model: SupportedChatModelId;
  setModel: (model: SupportedChatModelId) => void;
  providers: ProviderAvailability;
};

const PromptConfigContext = createContext<PromptConfigContextValue | null>(null);

export function usePromptConfig(): PromptConfigContextValue {
  const value = useContext(PromptConfigContext);
  if (!value) {
    throw new Error("usePromptConfig must be used within a PromptConfigProvider");
  }
  return value;
}

type PromptConfigProviderProps = {
  children: ReactNode;
};

export function PromptConfigProvider({ children }: PromptConfigProviderProps) {
  const providers = useMemo(() => readProviderAvailability(), []);
  const [mode, setMode] = useState<ModeType>(Mode.BUILD);
  const [model, setModel] = useState<SupportedChatModelId>(() =>
    resolveDefaultChatModelId(providers),
  );

  const toggleMode = useCallback(() => {
    setMode((m) => (m === Mode.BUILD ? Mode.PLAN : Mode.BUILD));
  }, []);

  return (
    <PromptConfigContext.Provider
      value={{
        mode,
        toggleMode,
        setMode,
        model,
        setModel,
        providers,
      }}
    >
      {children}
    </PromptConfigContext.Provider>
  );
}
