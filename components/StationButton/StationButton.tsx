import { MaterialIcons } from "@expo/vector-icons";
import React, { FC, useContext, useEffect } from "react";
import { Pressable, View } from "react-native";
import Colors from "../../constants/Colors";
import { HEADER_ICON_SIZE } from "../../constants/Layout";
import { IRadioSetting } from "../../getSettings";
import useColorScheme from "../../hooks/useColorScheme";
import { PlayContext } from "../context/play-context";
import { updateMeta } from "./getMetadata";

interface IStationButtonProps {
  config: IRadioSetting;
}

let metaUpdateInterval: ReturnType<typeof setInterval>;

export const StationButton: FC<IStationButtonProps> = ({ config }) => {
  const {
    name: channelName,
    channelUrl,
    metaTracksUrl,
    metaBroadcastUrl,
  } = config;
  const colorScheme = useColorScheme();
  const context = useContext(PlayContext);

  const onToggle = async () => {
    if (metaUpdateInterval) {
      clearInterval(metaUpdateInterval);
    }

    if (context.pbo) {
      await updateMeta({
        context,
        metaTracksUrl,
        metaBroadcastUrl,
        channelName,
      });
      // Stop playing songs, get ready for stream
      context.setStartSongId(null);
      context.setIsPlaying(false);
      if (context.isRadioPlaying) {
        await context.pbo.pauseAsync();
      } else {
        metaUpdateInterval = setInterval(() => {
          updateMeta({ context, metaTracksUrl, metaBroadcastUrl, channelName });
        }, 30 * 1000);

        await context.pbo.unloadAsync();
        await context.pbo.loadAsync({
          uri: channelUrl,
        });
        await context.pbo.playAsync();
      }

      context.setIsRadioPlaying(!context.isRadioPlaying);
    }
  };

  useEffect(() => {
    return () => {
      if (metaUpdateInterval) {
        clearInterval(metaUpdateInterval);
      }
    };
  }, []);

  return (
    <View>
      <Pressable
        onPress={onToggle}
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
