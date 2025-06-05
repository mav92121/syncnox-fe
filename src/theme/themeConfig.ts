import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#003220",
    borderRadius: 0, // ✅ Ensures 90-degree edges globally
    fontFamily: "Inter, sans-serif",
    fontSize: 13,
    lineWidth: 1,
    lineWidthBold: 1,
    colorBorder: "#d9d9d9",
    colorBorderSecondary: "#f0f0f0",
    controlOutlineWidth: 0.5,
    controlOutline: "#003220",
    controlHeight: 38,
  },
  components: {
    Input: {
      activeBorderColor: "#003220",
      hoverBorderColor: "#003220",
      activeShadow: "0 0 0 1px rgba(0, 50, 32, 0.1)",
      errorActiveShadow: "0 0 0 1px #ff4d4f",
      warningActiveShadow: "0 0 0 1px #faad14",
      controlHeight: 38,
      paddingBlock: 8,
    },
    Select: {
      activeBorderColor: "#003220",
      hoverBorderColor: "#003220",
      optionSelectedBg: "#F6FFED",
      optionActiveBg: "#f5f5f5",
      optionSelectedColor: "#003220",
      controlHeight: 38,
    },
    DatePicker: {
      activeBorderColor: "#003220",
      hoverBorderColor: "#003220",
      activeShadow: "0 0 0 1px rgba(0, 50, 32, 0.1)",
      controlHeight: 38,
      paddingBlock: 8,
    },
    Button: {
      primaryShadow: "none",
      controlHeight: 38,
      paddingBlock: 8,
    },
    Checkbox: {
      borderRadius: 0, // ✅ Square checkbox
    },
  },
};

export default theme;
