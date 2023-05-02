import { MaterialIcons } from "@expo/vector-icons";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { HEADER_ICON_SIZE } from "../../constants/Layout";
import useColorScheme from "../../hooks/useColorScheme";
import { RootState } from "../../store/store";
import { NowPlayingResponse, PlayContext } from "../context/play-context";
import { useStationButton } from "./useStationButton";
import { getMeta, updateMeta } from "./getMetadata";
import { IRadioSetting } from "../../getSettings";

let metaUpdateInterval: ReturnType<typeof setInterval>;

export const useSkipRadio = () => {
  const [isSkipping, setIsSkipping] = useState(false);
  // const context = useContext(PlayContext);
  // const lastChannelName = useSelector(
  //   (state: RootState) => state.radio.lastChannelName
  // );
  const [lastMeta, setLastMeta] = useState<NowPlayingResponse>();
  // const [lastTimestamp, setLastTimestamp] = useState<number>(0);

  useEffect(() => {
    return () => {
      stopSkipping();
    };
  }, []);

  const startSkipRadio = (radioSetting: IRadioSetting) => {
    let lastTimestamp = -1;

    setIsSkipping(true);

    // TODO start playing either context.setLibraryItems or context.setFavoritesDirItems or context.setPlaylist
    // console.log(context.)

    // setMetaUpdateInterval(
    metaUpdateInterval = setInterval(async () => {
      console.log("poll"); // TODO remove
      const meta = await getMeta(radioSetting);
      const newTimestamp = meta?.last_updated
        ? new Date(meta?.last_updated).getTime()
        : -1;

      if (lastTimestamp > -1 && newTimestamp > lastTimestamp) {
        console.log("NEW!!!", meta?.title);

        // TODO stopSkipping()
        stopSkipping();
        return;
      }

      console.log(
        "meta:",
        // meta?.title,
        // meta?.last_updated,
        newTimestamp,
        lastTimestamp
      );
      lastTimestamp = newTimestamp;
    }, 10 * 1000); // TODO 30 * 1000
    // );
  };

  const stopSkipping = () => {
    setIsSkipping(false);
    // TODO stop interval
    clearInterval(metaUpdateInterval);
    // TODO stop whatever is playing
    // TODO switch back to radio
  };

  return {
    startSkipRadio,
    isSkipping,
    stopSkipping,
  };
};
