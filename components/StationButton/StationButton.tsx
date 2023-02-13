import { MaterialIcons } from "@expo/vector-icons";
import React, { FC, useContext, useEffect } from "react";
import { Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { HEADER_ICON_SIZE } from "../../constants/Layout";
import { IRadioSetting } from "../../getSettings";
import useColorScheme from "../../hooks/useColorScheme";
import { PlayContext } from "../context/play-context";
import { clearMetaUpdateInterval } from "./radioSlice";
import { useStationButton } from "./useStationButton";

interface IStationButtonProps {
  config: IRadioSetting; // TODO remove
}

export const StationButton: FC<IStationButtonProps> = () => {
  const dispatch = useDispatch();
  const { toggle } = useStationButton();
  const colorScheme = useColorScheme();
  const context = useContext(PlayContext);

  useEffect(() => {
    return () => {
      dispatch(clearMetaUpdateInterval());
    };
  }, []);

  return (
    <View>
      <Pressable
        onPress={toggle}
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
