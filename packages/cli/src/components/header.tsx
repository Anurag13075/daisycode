import { TextAttributes } from "@opentui/core";
import { useTheme } from "../providers/theme";

export function Header() {
  const { colors } = useTheme();

  return (
    <box justifyContent="center" alignItems="center" flexDirection="column" gap={1}>
      <box flexDirection="row" justifyContent="center" gap={0.5} alignItems="center">
        <ascii-font font="tiny" text="Daisy" color={colors.primary} />
        <ascii-font font="tiny" text="Code" color="white" />
      </box>
      <text attributes={TextAttributes.DIM} fg={colors.dimSeparator}>
        free models · local tools · no account
      </text>
    </box>
  );
}
