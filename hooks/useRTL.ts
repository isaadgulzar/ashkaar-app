import { I18nManager } from "react-native";
import { useLanguage } from "../contexts/LanguageContext";

export const useRTL = () => {
  const { isRTL } = useLanguage();

  const rtlStyle = (ltrStyle: object, rtlStyleOverride?: object) => {
    if (isRTL()) {
      return { ...ltrStyle, ...rtlStyleOverride };
    }
    return ltrStyle;
  };

  const flipStyle = (style: any) => {
    if (!isRTL()) return style;

    const flipped = { ...style };

    // Flip horizontal properties
    if (flipped.marginLeft !== undefined) {
      const temp = flipped.marginLeft;
      flipped.marginLeft = flipped.marginRight || 0;
      flipped.marginRight = temp;
    }

    if (flipped.paddingLeft !== undefined) {
      const temp = flipped.paddingLeft;
      flipped.paddingLeft = flipped.paddingRight || 0;
      flipped.paddingRight = temp;
    }

    if (flipped.left !== undefined) {
      const temp = flipped.left;
      flipped.left = flipped.right;
      flipped.right = temp;
    }

    // Flip text alignment
    if (flipped.textAlign === "left") {
      flipped.textAlign = "right";
    } else if (flipped.textAlign === "right") {
      flipped.textAlign = "left";
    }

    return flipped;
  };

  const textAlign = (defaultAlign: "left" | "right" | "center" = "left") => {
    if (defaultAlign === "center") return "center";
    if (isRTL()) {
      return defaultAlign === "left" ? "right" : "left";
    }
    return defaultAlign;
  };

  const flexDirection = (
    direction: "row" | "row-reverse" | "column" | "column-reverse" = "row"
  ) => {
    if (isRTL() && direction === "row") {
      return "row-reverse";
    }
    if (isRTL() && direction === "row-reverse") {
      return "row";
    }
    return direction;
  };

  return {
    isRTL: isRTL(),
    isLTR: !isRTL(),
    rtlStyle,
    flipStyle,
    textAlign,
    flexDirection,
    I18nManager,
  };
};
