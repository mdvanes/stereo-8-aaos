import { createContext, FC, ReactNode, useState } from "react";
import { IPlaylist, ISong } from "../SubsonicButton/getSubsonic";

export interface PlayValues {
  isPlaying: boolean;
  isLoading: boolean;
  playlist: IPlaylist | null;
  song: ISong | null;
}

export const defaultPlayValues: PlayValues = {
  isPlaying: false,
  isLoading: false,
  playlist: null,
  song: null,
};

export const PlayContext = createContext({
  isPlaying: defaultPlayValues.isPlaying,
  setIsPlaying: (_: boolean) => {},
  isLoading: defaultPlayValues.isLoading,
  playlist: defaultPlayValues.playlist,
  setPlaylist: (_: IPlaylist | null) => {},
  song: defaultPlayValues.song,
  setSong: (_: ISong | null) => {},
});

export const PlayContextProvider: FC<{
  children?: ReactNode | undefined;
}> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(defaultPlayValues.isPlaying);
  const [song, setSong] = useState(defaultPlayValues.song);
  const [playlist, setPlaylist] = useState(defaultPlayValues.playlist);

  return (
    <PlayContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        isLoading: false,
        playlist,
        setPlaylist,
        song,
        setSong,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};
