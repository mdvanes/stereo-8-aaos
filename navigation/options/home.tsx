import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { ColorSchemeName, Image, Pressable } from "react-native";
import { styles } from "../../components/item.styles";
import Colors from "../../constants/Colors";
import { HEADER_FONT_SIZE, HEADER_ICON_SIZE } from "../../constants/Layout";
import { RootStackScreenProps } from "../../types";

export const stackScreenHomeOptions =
  (colorScheme: NonNullable<ColorSchemeName>) =>
  ({ navigation }: RootStackScreenProps<"Home">) => ({
    title: "Stereo 8 by mdworld.nl",
    headerTitleStyle: {
      fontSize: HEADER_FONT_SIZE,
    },
    headerLeft: () => (
      <Image
        style={styles.logo}
        source={require("../../assets/images/adaptive-icon.png")}
      />
    ),
    headerRight: () => (
      <Pressable
        onPress={() => navigation.navigate("Modal")}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <FontAwesome
          name="cog"
          size={HEADER_ICON_SIZE}
          color={Colors[colorScheme].text}
          style={{ marginRight: 15, marginVertical: 10 }}
        />
      </Pressable>
    ),
  });
