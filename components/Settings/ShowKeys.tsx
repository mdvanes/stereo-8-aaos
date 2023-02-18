import { FC, useContext, useEffect, useState } from "react";
import KeyEvent from "react-native-keyevent";
import { PlayContext } from "../context/play-context";
import { useGetNextSong } from "../SoundWrapper/useGetNextSong";
import { useGetPreviousSong } from "../SoundWrapper/useGetPreviousSong";
import { View, Text } from "../Themed";

type OnKeyDownEvent = { keyCode: number; action: unknown; pressedKey: unknown };

// TODO works in car and does not override volume up/down like in emulator Keycode 88 back 85 play 87 fwd
export const ShowKeys: FC = () => {
  const [log, setLog] = useState("");
  const context = useContext(PlayContext);
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
      console.log("pauseAsync", context);
      // dispatch(setIsRadioPlaying(false));
      await context.pbo.pauseAsync();
      context.setIsPlaying(false);
    }
  };

  const keyCodeMap = {
    21: {
      label: "previous",
      fn: previous,
    },
    88: {
      label: "previous",
      fn: previous,
    },
    20: {
      label: "pause",
      fn: pause,
    },
    85: {
      label: "pause",
      fn: pause,
    },
    22: {
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
      // TODO fix type
      const action: { label: string; fn: () => void } | undefined =
        // @ts-expect-error
        keyCodeMap[keyEvent.keyCode];

      // TODO does not work on web, but does work on emulator. E.g. arrow down:  LOG  onKeyDown keyCode: 20 LOG  Action: 0 LOG  Key:
      const msg = `keycode=${keyEvent.keyCode} action=${keyEvent.action} key=${keyEvent.pressedKey} action=${action?.label}`;
      console.log(msg);
      setLog(msg);

      if (action) {
        action.fn();
      }
    });

    return () => {
      KeyEvent.removeKeyDownListener();
    };
  }, []);

  return (
    <View
      style={{
        borderColor: "white",
        borderWidth: 1,
        padding: 20,
        marginVertical: 30,
      }}
    >
      <Text>show keys: {log}</Text>
    </View>
  );
};
