import * as React from "react";
import { ColorSchemeName } from "react-native";
import { RootStackScreenProps } from "../../types";
import { BackButton } from "../BackButton";

export const stackScreenModalOptions =
  (colorScheme: NonNullable<ColorSchemeName>) =>
  ({ navigation }: RootStackScreenProps<"Modal">) => ({
    title: "Settings",
    headerTitleStyle: { fontSize: 38 },
    headerLeft: () => <BackButton navigation={navigation} />,
  });
