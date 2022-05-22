import React, { MutableRefObject, useRef, useState } from "react";
import { Button } from "react-native";

const channelUrl = `https://icecast.omroep.nl/radio2-bb-mp3`;

// TODO extract channelUrl and label to props
export const StationButton = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onToggle = () => {
    const elem = audioRef.current;
    if (elem) {
      if (isPlaying) {
        elem.pause();
      } else {
        elem.src = `${channelUrl}?${Date.now()}`;
        elem.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        id="homeremote-stream-player-audio-elem"
        src={channelUrl}
        // @ts-expect-error
        type="audio/mpeg"
        controls
        style={{ display: "none" }}
      />
      <Button
        onPress={onToggle}
        title="Play NPO Radio 2"
        // color="#841584"
        // accessibilityLabel="Learn more about this purple button"
      />
    </>
  );
};
