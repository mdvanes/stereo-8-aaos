import { useContext, useEffect, useState } from "react";
import KeyEvent from "react-native-keyevent";
import { useGetNextSong } from "../SoundWrapper/useGetNextSong";
import { useGetPreviousSong } from "../SoundWrapper/useGetPreviousSong";
import { useStationButton } from "../StationButton/useStationButton";
import { PlayContext } from "./play-context";

export type OnKeyDownEvent = {
  keyCode: number;
  action: unknown;
  pressedKey: unknown;
};

// TODO does not work on web, but does work on emulator. E.g. arrow down:  LOG  onKeyDown keyCode: 20 LOG  Action: 0 LOG  Key:
export const useKeyListener = () => {
  const [keyEventLog, setKeyEventLog] = useState("");
  const context = useContext(PlayContext);
  const { toggle, clearMetaUpdateInterval } = useStationButton();

  const { getNextSong } = useGetNextSong();
  const { getPreviousSong } = useGetPreviousSong();

  const previous = () => {
    const previousSong = getPreviousSong();
    if (previousSong) {
      context.setStartSongId(previousSong.id);
    }
  };

  const next = () => {
    const nextSong = getNextSong();
    if (nextSong) {
      context.setStartSongId(nextSong.id);
    }
  };

  const pause = async () => {
    if (context.pbo) {
      try {
        if (context.isPlaying) {
          await context.pbo.pauseAsync();
          context.setIsPlaying(false);
          setKeyEventLog("paused playing");
        } else {
          const radioSetting = context.radioSetting;
          if (radioSetting) {
            await toggle(radioSetting);
            setKeyEventLog("toggle radio");
          }
        }
      } catch (err) {
        // will throw promise rejection when pbo not yet playing
        console.log(
          "nothing playing yet, key press to pause will not work:",
          err
        );
      }
    }
  };

  const keyCodeMap = {
    21: {
      // arrow left
      label: "previous",
      fn: previous,
    },
    88: {
      label: "previous",
      fn: previous,
    },
    20: {
      // arrow down
      label: "pause",
      fn: pause,
    },
    85: {
      label: "pause",
      fn: pause,
    },
    22: {
      // arrow right
      label: "next",
      fn: next,
    },
    24: {
      // phone volume up
      label: "pause",
      fn: pause,
    },
    25: {
      // phone volume down
      label: "next",
      fn: next,
    },
    87: {
      label: "next",
      fn: next,
    },
  } as const;

  useEffect(() => {
    KeyEvent.onKeyDownListener((keyEvent: OnKeyDownEvent) => {
      //   console.log(keyEvent);
      // TODO fix type
      const action: { label: string; fn: () => void } | undefined =
        // @ts-expect-error
        keyCodeMap[keyEvent.keyCode];

      const msg = `keycode=${keyEvent.keyCode} action=${keyEvent.action} key=${keyEvent.pressedKey} action=${action?.label}`;
      console.log(msg);
      //   setLog(msg);
      setKeyEventLog(msg);

      if (action) {
        // TODO there is no keyEvent.stopPropagation() ?
        action.fn();
      }
    });

    return () => {
      KeyEvent.removeKeyDownListener();
    };
  }, [keyCodeMap]);

  return { keyEventLog, setKeyEventLog };
};
