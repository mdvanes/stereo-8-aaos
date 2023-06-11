import { MaterialIcons } from "@expo/vector-icons";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { HEADER_ICON_SIZE } from "../../constants/Layout";
import useColorScheme from "../../hooks/useColorScheme";
import { RootState } from "../../store/store";
import { PlayContext } from "../context/play-context";
import { useSkipRadio } from "./useSkipRadio";
import { useStationButton } from "./useStationButton";

export const StationButton: FC = () => {
  const { toggle, clearMetaUpdateInterval } = useStationButton();
  const colorScheme = useColorScheme();
  const context = useContext(PlayContext);
  const radioSetting = context.radioSetting;
  const isRadioPlaying = useSelector(
    (state: RootState) => state.radio.isRadioPlaying
  );
  const [isLoading, setIsLoading] = useState(false);
  const { startSkipRadio, isSkipping, cancelSkipping } = useSkipRadio();

  useEffect(() => {
    return () => {
      clearMetaUpdateInterval();
    };
  }, []);

  const handleOnPress = useCallback(async () => {
    cancelSkipping();
    if (radioSetting) {
      setIsLoading(true);
      await toggle(radioSetting);
      setIsLoading(false);
    }
  }, [radioSetting, context, isRadioPlaying]);

  const handleOnLongPress = useCallback(async () => {
    if (isRadioPlaying && radioSetting) {
      await handleOnPress();
      startSkipRadio(radioSetting);
    }
  }, [handleOnPress, isRadioPlaying]);

  return (
    <View>
      <Pressable
        onPress={handleOnPress}
        onLongPress={handleOnLongPress}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        {isLoading ? (
          <ActivityIndicator size={HEADER_ICON_SIZE} color="white" />
        ) : (
          <MaterialIcons
            name={isRadioPlaying ? "pause-circle-filled" : "radio"}
            size={HEADER_ICON_SIZE}
            color={isSkipping ? "#2f95dc" : Colors[colorScheme].text}
          />
        )}
      </Pressable>
    </View>
  );
};
