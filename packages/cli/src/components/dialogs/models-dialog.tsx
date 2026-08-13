import { useCallback } from "react";
import { useDialog } from "../../providers/dialog";
import { DialogSearchList } from "../dialog-search-list";
import { findSupportedChatModel, type SupportedChatModelId } from "@daisycode/shared";
import { useTheme } from "../../providers/theme";

type ModelsDialogContentProps = {
  models: SupportedChatModelId[];
  onSelectModel: (modelId: SupportedChatModelId) => void;
};

export const ModelsDialogContent = ({
  models,
  onSelectModel,
}: ModelsDialogContentProps) => {
  const dialog = useDialog();
  const { colors } = useTheme();

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
        const label = findSupportedChatModel(modelId)?.label ?? modelId;
        const q = query.toLowerCase();
        return modelId.toLowerCase().includes(q) || label.toLowerCase().includes(q);
      }}
      renderItem={(modelId, isSelected) => {
        const model = findSupportedChatModel(modelId);
        return (
          <box flexDirection="row" gap={1} overflow="hidden">
            <text selectable={false} fg={isSelected ? "black" : colors.primary}>
              {model?.label ?? modelId}
            </text>
            <text selectable={false} fg={isSelected ? "black" : "gray"}>
              {modelId}
            </text>
          </box>
        );
      }}
      getKey={(modelId) => modelId}
      placeholder="Search free models"
      emptyText="No matching free models"
    />
  );
};
