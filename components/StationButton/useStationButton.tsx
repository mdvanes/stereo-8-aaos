import { useContext } from "react";
import { useDispatch } from "react-redux";
import { PlayContext } from "../context/play-context";
import { updateMeta } from "./getMetadata";
import { clearMetaUpdateInterval, setMetaUpdateInterval } from "./radioSlice";

export const useStationButton = () => {
  const context = useContext(PlayContext);
  const dispatch = useDispatch();

  const toggle = async () => {
    dispatch(clearMetaUpdateInterval());
    const { radioSetting } = context;
    if (!radioSetting) {
      return;
    }

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
        const metaUpdateInterval = setInterval(() => {
          updateMeta({ context, metaTracksUrl, metaBroadcastUrl, channelName });
        }, 30 * 1000);
        dispatch(setMetaUpdateInterval(metaUpdateInterval));

        await context.pbo.unloadAsync();
        await context.pbo.loadAsync({
          uri: channelUrl,
        });
        await context.pbo.playAsync();
      }

      context.setIsRadioPlaying(!context.isRadioPlaying);
    }
  };

  return { toggle };
};
