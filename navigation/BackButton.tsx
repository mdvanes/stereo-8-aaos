import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Pressable } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

// Needed because the font-size of the built-in backbutton can't be overridden
export const BackButton = ({
  navigation,
}: {
  navigation: { goBack: () => void };
}) => {
  const colorScheme = useColorScheme();
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <FontAwesome
        name="arrow-left"
        size={50}
        color={Colors[colorScheme].text}
        style={{ marginHorizontal: 15, marginVertical: 10 }}
      />
    </Pressable>
  );
};
