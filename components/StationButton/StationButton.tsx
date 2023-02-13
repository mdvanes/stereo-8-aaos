import { MaterialIcons } from "@expo/vector-icons";
import React, { FC, useCallback, useContext, useEffect } from "react";
import { Pressable, View } from "react-native";
import Colors from "../../constants/Colors";
import { HEADER_ICON_SIZE } from "../../constants/Layout";
import useColorScheme from "../../hooks/useColorScheme";
import { PlayContext } from "../context/play-context";
import { useStationButton } from "./useStationButton";

export const StationButton: FC = () => {
  const { toggle, clearMetaUpdateInterval } = useStationButton();
  const colorScheme = useColorScheme();
  const context = useContext(PlayContext);
  const radioSetting = context.radioSetting;

  useEffect(() => {
    return () => {
      clearMetaUpdateInterval();
    };
  }, []);

  const handleOnPress = useCallback(async () => {
    if (radioSetting) {
      await toggle(radioSetting);
    }
  }, [radioSetting, context]);

  return (
    <View>
      <Pressable
        onPress={handleOnPress}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <MaterialIcons
          name={context.isRadioPlaying ? "pause-circle-filled" : "radio"}
          size={HEADER_ICON_SIZE}
          color={Colors[colorScheme].text}
        />
      </Pressable>
    </View>
  );
};
