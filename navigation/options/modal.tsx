import React from "react";
import { ColorSchemeName } from "react-native";
import { HEADER_FONT_SIZE } from "../../constants/Layout";
import { RootStackScreenProps } from "../../types";
import { BackButton } from "../BackButton";

export const stackScreenModalOptions =
  (colorScheme: NonNullable<ColorSchemeName>) =>
  ({ navigation }: RootStackScreenProps<"Modal">) => ({
    title: "Settings",
    headerTitleStyle: {
      fontSize: HEADER_FONT_SIZE,
    },
    headerLeft: () => <BackButton navigation={navigation} />,
  });
