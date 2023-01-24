import { createContext, FC, ReactNode, useState } from "react";
import { IPlaylist, ISong } from "../Subsonic/getSubsonic";
import { Audio } from "expo-av";

export interface PlayValues {
  isPlaying: boolean;
  isRadioPlaying: boolean;
  isLoading: boolean;
  playlist: IPlaylist | null;
  song: ISong | null;
  queue: ISong[] | null;
  startSongId: string | null;
  pbo: Audio.Sound | null;
  progress: number;
}

export const defaultPlayValues: PlayValues = {
  isPlaying: false,
  isRadioPlaying: false,
  isLoading: false,
  playlist: null,
  song: null,
  queue: null,
  startSongId: null,
  pbo: null,
  progress: 0,
};

export const PlayContext = createContext({
  isPlaying: defaultPlayValues.isPlaying,
  setIsPlaying: (_: PlayValues["isPlaying"]) => {},
  isRadioPlaying: defaultPlayValues.isPlaying,
  setIsRadioPlaying: (_: PlayValues["isRadioPlaying"]) => {},
  isLoading: defaultPlayValues.isLoading,
  setIsLoading: (_: boolean) => {},
  playlist: defaultPlayValues.playlist,
  setPlaylist: (_: IPlaylist | null) => {},
  song: defaultPlayValues.song,
  setSong: (_: ISong | null) => {},
  queue: defaultPlayValues.queue,
  setQueue: (_: PlayValues["queue"]) => {},
  startSongId: defaultPlayValues.startSongId,
  setStartSongId: (_: PlayValues["startSongId"]) => {},
  pbo: defaultPlayValues.pbo,
  setPbo: (_: PlayValues["pbo"]) => {},
  progress: defaultPlayValues.progress,
  setProgress: (_: PlayValues["progress"]) => {},
});

export const PlayContextProvider: FC<{
  children?: ReactNode | undefined;
}> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(defaultPlayValues.isPlaying);
  const [isRadioPlaying, setIsRadioPlaying] = useState(
    defaultPlayValues.isPlaying
  );
  const [isLoading, setIsLoading] = useState(defaultPlayValues.isPlaying);
  const [song, setSong] = useState(defaultPlayValues.song);
  const [queue, setQueue] = useState(defaultPlayValues.queue);
  const [startSongId, setStartSongId] = useState(defaultPlayValues.startSongId);
  const [playlist, setPlaylist] = useState(defaultPlayValues.playlist);
  const [pbo, setPbo] = useState<PlayValues['pbo']>(defaultPlayValues.pbo);
  const [progress, setProgress] = useState<PlayValues['progress']>(defaultPlayValues.progress);

  return (
    <PlayContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        isRadioPlaying,
        setIsRadioPlaying,
        isLoading,
        setIsLoading,
        playlist,
        setPlaylist,
        song,
        setSong,
        queue,
        setQueue,
        startSongId,
        setStartSongId,
        pbo,
        setPbo,
        progress, setProgress
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};
