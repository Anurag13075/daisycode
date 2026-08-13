import { useCallback } from "react";
import { useNavigate } from "react-router";
import { TextAttributes } from "@opentui/core";
import { Header } from "../components/header";
import { InputBar } from "../components/input-bar";
import { usePromptConfig } from "../providers/prompt-config";
import { useTheme } from "../providers/theme";
import { findSupportedChatModel } from "@daisycode/shared";

export function Home() {
  const navigate = useNavigate();
  const { mode, model } = usePromptConfig();
  const { colors } = useTheme();
  const modelLabel = findSupportedChatModel(model)?.label ?? model;

  const handleSubmit = useCallback(
    (text: string) => {
      navigate("/sessions/new", { state: { message: text, mode, model } });
    },
    [navigate, mode, model],
  );

  return (
    <box
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      gap={2}
      position="relative"
      width="100%"
      height="100%"
    >
      <Header />
      <box width="100%" maxWidth={78} paddingX={2} flexDirection="column" gap={1}>
        <box flexDirection="row" gap={2} justifyContent="center" flexShrink={0}>
          <text fg={colors.accent}>✦</text>
          <text attributes={TextAttributes.DIM} fg={colors.dimSeparator}>
            {mode === "PLAN" ? "Plan" : "Build"} · {modelLabel}
          </text>
          <text fg={colors.accent}>✦</text>
        </box>
        <InputBar onSubmit={handleSubmit} />
        <box flexDirection="row" gap={2} flexShrink={0} justifyContent="center">
          <text attributes={TextAttributes.DIM} fg={colors.dimSeparator}>
            / for commands
          </text>
          <text attributes={TextAttributes.DIM} fg={colors.dimSeparator}>
            ·
          </text>
          <text attributes={TextAttributes.DIM} fg={colors.dimSeparator}>
            tab agents
          </text>
          <text attributes={TextAttributes.DIM} fg={colors.dimSeparator}>
            ·
          </text>
          <text attributes={TextAttributes.DIM} fg={colors.dimSeparator}>
            @ mention files
          </text>
        </box>
      </box>
    </box>
  );
}
