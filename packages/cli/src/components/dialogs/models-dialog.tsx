import { useCallback } from "react";
import { useDialog } from "../../providers/dialog";
import { DialogSearchList } from "../dialog-search-list";
import { findSupportedChatModel, type SupportedChatModelId } from "@daisycode/shared";
import { usePromptConfig } from "../../providers/prompt-config";

type ModelsDialogContentProps = {
  models: SupportedChatModelId[];
  onSelectModel: (modelId: SupportedChatModelId) => void;
};

function formatModelLine(modelId: SupportedChatModelId, ready: boolean) {
  const model = findSupportedChatModel(modelId);
  const label = model?.label ?? modelId;
  const provider = model?.provider ?? "unknown";
  const status = ready ? "ready" : "no key";
  return `${label}  [${provider}/${status}]`;
}

export const ModelsDialogContent = ({
  models,
  onSelectModel,
}: ModelsDialogContentProps) => {
  const dialog = useDialog();
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
          <text selectable={false} fg={isSelected ? "black" : "white"}>
            {formatModelLine(modelId, ready)}
          </text>
        );
      }}
      getKey={(modelId) => modelId}
      placeholder="Search free models (OpenCode / Grok / Cerebras)"
      emptyText="No matching models"
    />
  );
};
