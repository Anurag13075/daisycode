import { useCallback } from "react";
import { useDialog } from "../../providers/dialog";
import { DialogSearchList } from "../dialog-search-list";
import { findSupportedChatModel, type SupportedChatModelId } from "@daisycode/shared";
import { useTheme } from "../../providers/theme";
import { usePromptConfig } from "../../providers/prompt-config";

type ModelsDialogContentProps = {
  models: SupportedChatModelId[];
  onSelectModel: (modelId: SupportedChatModelId) => void;
};

function providerReadyLabel(
  provider: "opencode" | "grok" | "cerebras",
  ready: boolean,
) {
  if (ready) return "ready";
  switch (provider) {
    case "opencode":
      return "needs OPENCODE_API_KEY";
    case "grok":
      return "needs XAI_API_KEY";
    case "cerebras":
      return "needs CEREBRAS_API_KEY";
  }
}

export const ModelsDialogContent = ({
  models,
  onSelectModel,
}: ModelsDialogContentProps) => {
  const dialog = useDialog();
  const { colors } = useTheme();
  const { providers } = usePromptConfig();

  const handleSelect = useCallback(
    (modelId: SupportedChatModelId) => {
      onSelectModel(modelId);
      dialog.close();
    },
    [dialog, onSelectModel],
  );

  return (
    <DialogSearchList
      items={models}
      onSelect={handleSelect}
      filterFn={(modelId, query) => {
        const model = findSupportedChatModel(modelId);
        const label = model?.label ?? modelId;
        const provider = model?.provider ?? "";
        const q = query.toLowerCase();
        return (
          modelId.toLowerCase().includes(q) ||
          label.toLowerCase().includes(q) ||
          provider.toLowerCase().includes(q)
        );
      }}
      renderItem={(modelId, isSelected) => {
        const model = findSupportedChatModel(modelId);
        const ready = model ? providers[model.provider] : false;
        return (
          <box flexDirection="row" gap={1} overflow="hidden">
            <text selectable={false} fg={isSelected ? "black" : colors.primary}>
              {model?.label ?? modelId}
            </text>
            <text selectable={false} fg={isSelected ? "black" : "gray"}>
              {model?.provider ?? "?"} ·{" "}
              {model
                ? providerReadyLabel(model.provider, ready)
                : "unknown"}
            </text>
          </box>
        );
      }}
      getKey={(modelId) => modelId}
      placeholder="Search free models (OpenCode / Grok / Cerebras)"
      emptyText="No matching models"
    />
  );
};
