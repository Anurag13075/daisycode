export type ThemeColors = {
  primary: string;
  planMode: string;
  selection: string;
  thinking: string;
  success: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  dialogSurface: string;
  thinkingBorder: string;
  dimSeparator: string;
  accent: string;
};

export type Theme = {
  name: string;
  colors: ThemeColors;
};

export const THEMES: Theme[] = [
  {
    name: "Daisy",
    colors: {
      primary: "#F5C542",
      planMode: "#7EC8E3",
      selection: "#F5C542",
      thinking: "#C4B5A0",
      success: "#7BC47F",
      error: "#E36B6B",
      info: "#7EC8E3",
      background: "#0C0C0A",
      surface: "#161612",
      dialogSurface: "#10100C",
      thinkingBorder: "#3A372E",
      dimSeparator: "#5C574C",
      accent: "#E8B923",
    },
  },
  {
    name: "Petal Dark",
    colors: {
      primary: "#E8C547",
      planMode: "#8FB8C9",
      selection: "#D4A84B",
      thinking: "#A89F8D",
      success: "#6FBF73",
      error: "#D96060",
      info: "#8FB8C9",
      background: "#0A0B0D",
      surface: "#14161A",
      dialogSurface: "#0E1013",
      thinkingBorder: "#343841",
      dimSeparator: "#555A66",
      accent: "#F0D060",
    },
  },
  {
    name: "Stem",
    colors: {
      primary: "#D4B44A",
      planMode: "#6AAE8A",
      selection: "#D4B44A",
      thinking: "#8A9A7A",
      success: "#6AAE8A",
      error: "#C75C5C",
      info: "#7A9EB8",
      background: "#0B0F0C",
      surface: "#141A16",
      dialogSurface: "#0E130F",
      thinkingBorder: "#2E3A32",
      dimSeparator: "#4A5850",
      accent: "#C9A83A",
    },
  },
  {
    name: "Inkfield",
    colors: {
      primary: "#E6C35C",
      planMode: "#9AABB8",
      selection: "#E6C35C",
      thinking: "#9A9385",
      success: "#7CB87C",
      error: "#D66A6A",
      info: "#9AABB8",
      background: "#090909",
      surface: "#131313",
      dialogSurface: "#0C0C0C",
      thinkingBorder: "#2E2E2E",
      dimSeparator: "#4A4A4A",
      accent: "#F0D070",
    },
  },
  {
    name: "Amber Workspace",
    colors: {
      primary: "#F0B429",
      planMode: "#6BB3C9",
      selection: "#F0B429",
      thinking: "#B0A090",
      success: "#70B070",
      error: "#E05555",
      info: "#6BB3C9",
      background: "#0D0B08",
      surface: "#1A1610",
      dialogSurface: "#120F0A",
      thinkingBorder: "#3D3528",
      dimSeparator: "#5A5040",
      accent: "#FFC94A",
    },
  },
];

export const DEFAULT_THEME = THEMES.find((t) => t.name === "Daisy")!;
