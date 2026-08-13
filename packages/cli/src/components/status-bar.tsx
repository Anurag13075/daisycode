import { TextAttributes } from "@opentui/core";
import { useTheme } from "../providers/theme";
import { usePromptConfig } from "../providers/prompt-config";
import { Mode, findSupportedChatModel } from "@daisycode/shared";

export function StatusBar() {
  const { mode, model } = usePromptConfig();
  const { colors } = useTheme();
  const modelLabel = findSupportedChatModel(model)?.label ?? model;

  return (
    <box flexDirection="row" gap={1} alignItems="center">
      <text fg={colors.accent}>◆</text>
      <text fg={mode === Mode.PLAN ? colors.planMode : colors.primary}>
        {mode === Mode.PLAN ? "Plan" : "Build"}
      </text>
      <text attributes={TextAttributes.DIM} fg={colors.dimSeparator}>
        ·
      </text>
      <text fg={colors.info}>{modelLabel}</text>
    </box>
  );
}
