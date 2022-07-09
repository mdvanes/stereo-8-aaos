import { createContext, FC, ReactNode, useState } from "react";
import { IPlaylist, ISong } from "../SubsonicButton/getSubsonic";
import { Audio } from "expo-av";

export interface PlayValues {
  isPlaying: boolean;
  isLoading: boolean;
  playlist: IPlaylist | null;
  song: ISong | null;
  startSongId: string | null;
  pbo: Audio.Sound | null;
}

export const defaultPlayValues: PlayValues = {
  isPlaying: false,
  isLoading: false,
  playlist: null,
  song: null,
  startSongId: null,
  pbo: null,
};

export const PlayContext = createContext({
  isPlaying: defaultPlayValues.isPlaying,
  setIsPlaying: (_: boolean) => {},
  isLoading: defaultPlayValues.isLoading,
  setIsLoading: (_: boolean) => {},
  playlist: defaultPlayValues.playlist,
  setPlaylist: (_: IPlaylist | null) => {},
  song: defaultPlayValues.song,
  setSong: (_: ISong | null) => {},
  startSongId: defaultPlayValues.startSongId,
  setStartSongId: (_: PlayValues["startSongId"]) => {},
  pbo: defaultPlayValues.pbo,
  setPbo: (_: PlayValues["pbo"]) => {},
});

export const PlayContextProvider: FC<{
  children?: ReactNode | undefined;
}> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(defaultPlayValues.isPlaying);
  const [isLoading, setIsLoading] = useState(defaultPlayValues.isPlaying);
  const [song, setSong] = useState(defaultPlayValues.song);
  const [startSongId, setStartSongId] = useState(defaultPlayValues.startSongId);
  const [playlist, setPlaylist] = useState(defaultPlayValues.playlist);
  const [pbo, setPbo] = useState<Audio.Sound | null>(defaultPlayValues.pbo);

  return (
    <PlayContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        isLoading,
        setIsLoading,
        playlist,
        setPlaylist,
        song,
        setSong,
        startSongId,
        setStartSongId,
        pbo,
        setPbo,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};
