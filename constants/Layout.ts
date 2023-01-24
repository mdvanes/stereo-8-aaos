import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const BOTTOM_FONT_SIZE_RESPONSIVE = {
  BIG: 28,
  SMALL: 14,
};

export const BOTTOM_FONT_SIZE =
  width > 500
    ? BOTTOM_FONT_SIZE_RESPONSIVE.BIG
    : BOTTOM_FONT_SIZE_RESPONSIVE.SMALL;

const HEADER_FONT_SIZE_RESPONSIVE = {
  BIG: 38,
  SMALL: 24,
};

export const HEADER_FONT_SIZE =
  width > 500
    ? HEADER_FONT_SIZE_RESPONSIVE.BIG
    : HEADER_FONT_SIZE_RESPONSIVE.SMALL;

const HEADER_ICON_SIZE_RESPONSIVE = {
  BIG: 60,
  SMALL: 30,
};

export const HEADER_ICON_SIZE =
  width > 500
    ? HEADER_ICON_SIZE_RESPONSIVE.BIG
    : HEADER_ICON_SIZE_RESPONSIVE.SMALL;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isBigDevice: width > 500,
};
