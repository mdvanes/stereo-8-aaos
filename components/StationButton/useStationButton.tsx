import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRadioSetting } from "../../getSettings";
import { RootState } from "../../store/store";
import { PlayContext } from "../context/play-context";
import { updateMeta } from "./getMetadata";
import { setIsRadioPlaying, setLastChannelName } from "./radioSlice";

let metaUpdateInterval: ReturnType<typeof setInterval>;

export const useStationButton = () => {
  const context = useContext(PlayContext);
  const isRadioPlaying = useSelector(
    (state: RootState) => state.radio.isRadioPlaying
  );
  const lastChannelName = useSelector(
    (state: RootState) => state.radio.lastChannelName
  );
  const dispatch = useDispatch();

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

      const { channelUrl, name: channelName } = radioSetting;

      if (context.pbo) {
        await updateMeta({
          context,
          radioSetting,
        });
        // Stop playing songs, get ready for stream
        context.setStartSongId(null);
        context.setIsPlaying(false);

        if (isRadioPlaying && lastChannelName === channelName) {
          await context.pbo.unloadAsync();
          dispatch(setIsRadioPlaying(false));
        } else {
          setMetaUpdateInterval(
            setInterval(() => {
              updateMeta({
                context,
                radioSetting,
              });
            }, 30 * 1000)
          );

          await context.pbo.unloadAsync();
          await context.pbo.loadAsync({
            uri: channelUrl,
          });
          await context.pbo.playAsync();
          dispatch(setLastChannelName(channelName));
          dispatch(setIsRadioPlaying(true));
        }
      } else {
        alert("Unexpected unset PBO");
      }
    },
    [context, isRadioPlaying, lastChannelName]
  );

  return { clearMetaUpdateInterval, toggle };
};
