import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { Pressable } from "react-native";
import RNExitApp from "react-native-exit-app";
import Colors from "../../constants/Colors";
import { HEADER_ICON_SIZE } from "../../constants/Layout";

export const ExitButton: FC = () => {
  return (
    <Pressable
      onPress={async () => {
        RNExitApp.exitApp();
      }}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor: "red",
        borderRadius: 8,
        padding: 10,
        opacity: pressed ? 0.5 : 1,
        flex: 1,
      })}
    >
      <FontAwesome
        name="close"
        size={HEADER_ICON_SIZE}
        color={Colors["dark"].text}
      />
    </Pressable>
  );
};
