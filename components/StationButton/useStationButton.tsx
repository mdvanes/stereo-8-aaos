import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRadioSetting } from "../../getSettings";
import { RootState } from "../../store/store";
import { PlayContext } from "../context/play-context";
import { updateMeta } from "./getMetadata";
import { setIsRadioPlaying } from "./radioSlice";

let metaUpdateInterval: ReturnType<typeof setInterval>;

export const useStationButton = () => {
  const context = useContext(PlayContext);
  const isRadioPlaying = useSelector(
    (state: RootState) => state.radio.isRadioPlaying
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

      const { name: channelName, channelUrl, schema } = radioSetting;

      if (context.pbo) {
        await updateMeta({
          context,
          radioSetting,
        });
        // Stop playing songs, get ready for stream
        context.setStartSongId(null);
        context.setIsPlaying(false);

        if (isRadioPlaying) {
          await context.pbo.pauseAsync();
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
        }

        dispatch(setIsRadioPlaying(!isRadioPlaying));
      } else {
        alert("Unexpected unset PBO");
      }
    },
    [context, isRadioPlaying]
  );

  return { clearMetaUpdateInterval, toggle };
};
