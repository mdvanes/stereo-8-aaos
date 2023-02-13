import { useCallback, useContext } from "react";
import { IRadioSetting } from "../../getSettings";
import { PlayContext } from "../context/play-context";
import { updateMeta } from "./getMetadata";

let metaUpdateInterval: ReturnType<typeof setInterval>;

export const useStationButton = () => {
  const context = useContext(PlayContext);

  const clearMetaUpdateInterval = () => {
    if (metaUpdateInterval) {
      clearInterval(metaUpdateInterval);
    }
  };

  const setMetaUpdateInterval = (timer: ReturnType<typeof setInterval>) => {
    metaUpdateInterval = timer;
  };

  const toggle = useCallback(
    async (radioSetting: IRadioSetting) => {
      clearMetaUpdateInterval();

      const {
        name: channelName,
        channelUrl,
        metaTracksUrl,
        metaBroadcastUrl,
      } = radioSetting;

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
          setMetaUpdateInterval(
            setInterval(() => {
              updateMeta({
                context,
                metaTracksUrl,
                metaBroadcastUrl,
                channelName,
              });
            }, 30 * 1000)
          );

          await context.pbo.unloadAsync();
          await context.pbo.loadAsync({
            uri: channelUrl,
          });
          await context.pbo.playAsync();
        }

        context.setIsRadioPlaying(!context.isRadioPlaying);
      } else {
        alert("Unexpected unset PBO");
      }
    },
    [context]
  );

  return { clearMetaUpdateInterval, toggle };
};
