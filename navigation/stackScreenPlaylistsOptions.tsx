import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { ColorSchemeName, Image, Pressable } from "react-native";
import { styles } from "../components/item.styles";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";

export const stackScreenPlaylistsOptions =
  (colorScheme: NonNullable<ColorSchemeName>) =>
  ({ navigation }: RootStackScreenProps<"Playlists">) => ({
    title: "Stereo 8 by mdworld.nl",
    headerTitleStyle: {
      fontSize: 38,
    },
    headerLeft: () => (
      <Image
        style={styles.logo}
        source={require("../assets/images/adaptive-icon.png")}
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
          size={60}
          color={Colors[colorScheme].text}
          style={{ marginRight: 15, marginVertical: 10 }}
        />
      </Pressable>
    ),
  });
