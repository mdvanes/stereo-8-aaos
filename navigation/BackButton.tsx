import { FontAwesome } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Pressable } from "react-native";
import { PlayContext } from "../components/context/play-context";
import Colors from "../constants/Colors";
import { HEADER_ICON_SIZE } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";

// Needed because the font-size of the built-in backbutton can't be overridden
export const BackButton = ({
  navigation,
}: {
  navigation: { goBack: () => void };
}) => {
  const colorScheme = useColorScheme();
  const context = useContext(PlayContext);

  return (
    <Pressable
      onPress={() => {
        context.setFavoritesDirItems(null);
        navigation.goBack();
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <FontAwesome
        name="arrow-left"
        size={HEADER_ICON_SIZE}
        color={Colors[colorScheme].text}
        style={{ marginHorizontal: 15, marginVertical: 10 }}
      />
    </Pressable>
  );
};
