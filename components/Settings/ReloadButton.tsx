import { FontAwesome } from "@expo/vector-icons";
import React, { FC, useContext } from "react";
import { Pressable } from "react-native";
import Colors from "../../constants/Colors";
import { HEADER_ICON_SIZE } from "../../constants/Layout";
import { PlayContext } from "../context/play-context";
import { ReloadContext } from "../context/reload-context";

export const ReloadButton: FC = () => {
  const context = useContext(PlayContext);
  const reloadContext = useContext(ReloadContext);

  return (
    <Pressable
      onPress={async () => {
        if (context.pbo) {
          await context.pbo.unloadAsync();
        }
        reloadContext.reload();
      }}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor: "red",
        borderRadius: 8,
        padding: 10,
        opacity: pressed ? 0.5 : 1,
        marginTop: 20,
        minWidth: 400,
        width: "25%",
      })}
    >
      <FontAwesome
        name="recycle"
        size={HEADER_ICON_SIZE}
        color={Colors["dark"].text}
      />
    </Pressable>
  );
};
