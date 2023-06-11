import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import {
  ILastPlayedItem,
  lastPlayedItemStoreKey,
} from "../../constants/StorageKeys";
import { IRadioSetting } from "../../getSettings";
import { PlayContext } from "../context/play-context";
import { getMeta } from "./getMetadata";
import { useStationButton } from "./useStationButton";
import { useDispatch } from "react-redux";
import { setIsRadioPlaying } from "./radioSlice";

let metaUpdateInterval: ReturnType<typeof setInterval>;

export const useSkipRadio = () => {
  const [isSkipping, setIsSkipping] = useState(false);
  const context = useContext(PlayContext);
  // const [lastMeta, setLastMeta] = useState<NowPlayingResponse>(); // TODO cleanup?
  const { toggle } = useStationButton();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      cancelSkipping();
    };
  }, []);

  const startSkipRadio = async (radioSetting: IRadioSetting) => {
    let lastTimestamp = -1;

    setIsSkipping(true);

    const lastPlayedItemJson = await AsyncStorage.getItem(
      lastPlayedItemStoreKey
    );
    const lastPlayedItem: ILastPlayedItem =
      lastPlayedItemJson && JSON.parse(lastPlayedItemJson);

    // TODO currently only works for songs started from playlist, not from favorites
    // TODO start playing either context.setLibraryItems or context.setFavoritesDirItems or context.setPlaylist
    console.log(
      // context.playlist,
      // context.startSongId,
      // context.favoritesDirItems,
      // context.libraryItems,
      "lastPlayedItem",
      lastPlayedItem
    );

    if (
      lastPlayedItem.type === "playlist" &&
      lastPlayedItem.id &&
      lastPlayedItem.name
    ) {
      context.setPlaylist({ id: lastPlayedItem.id, name: lastPlayedItem.name });
      // TODO if null, start the first.
      if (lastPlayedItem.songId) {
        // dispatch(setIsRadioPlaying(false));
        // Start the song (SoundWrapper.handlePlaySong), this stops the radio and calls useStationButton.clearMetaUpdateInterval
        context.setStartSongId(lastPlayedItem.songId);
      }
    }

    // setMetaUpdateInterval(
    metaUpdateInterval = setInterval(async () => {
      // console.log("poll"); // TODO remove
      const meta = await getMeta(radioSetting);
      const newTimestamp = meta?.last_updated
        ? new Date(meta?.last_updated).getTime()
        : -1;

      if (lastTimestamp > -1 && newTimestamp > lastTimestamp) {
        console.log("NEW!!!", meta?.title); // TODO remove

        await finishSkipping();
        return;
      }

      console.log(
        "meta:",
        // meta?.title,
        // meta?.last_updated,
        newTimestamp,
        lastTimestamp
      ); // TODO remove
      lastTimestamp = newTimestamp;
    }, 10 * 1000); // TODO 30 * 1000
    // );
  };

  const finishSkipping = async () => {
    console.log("FINISH SKIPPING"); // TODO remove
    setIsSkipping(false);
    // stop skip meta interval
    clearInterval(metaUpdateInterval);
    // Stop whatever is playing ____
    // not needed, is done by toggle - await context.pbo?.pauseAsync();
    // context.setIsPlaying(false);
    // TODO switch back to radio (automatically stops other playing items)
    if (context.radioSetting) {
      // Something is setting setIsRadioPlaying to true for some reason...
      // dispatch(setIsRadioPlaying(false));
      // isRadioPlaying is never updated in toggle useCallback in useStationButton, maybe because no rerender? So force that we know we want to toggle from stop to start
      toggle(context.radioSetting!, true);
      // setTimeout(() => {
      //   console.log(context.radioSetting);
      //   // isRadioPlaying is never updated in toggle useCallback in useStationButton, maybe because no rerender? So force that we know we want to toggle from stop to start
      //   toggle(context.radioSetting!, true);
      // }, 1000);
      // TODO does it need dispatch(setIsRadioPlaying(false)); ? No it is inside toggle
    }
  };

  const cancelSkipping = () => {
    console.log("STOP SKIPPING"); // TODO remove
    setIsSkipping(false);
    // stop skip meta interval
    clearInterval(metaUpdateInterval);
  };

  return {
    startSkipRadio,
    isSkipping,
    cancelSkipping,
  };
};
