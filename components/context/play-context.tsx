import { createContext, FC, ReactNode, useState } from "react";
import { IPlaylist } from "../SubsonicButton/getSubsonic";

export interface PlayValues {
  isPlaying: boolean;
  isLoading: boolean;
  title: string;
  artist: string;
  playlist: IPlaylist | null;
}

export const defaultPlayValues: PlayValues = {
  isPlaying: false,
  isLoading: false,
  title: "",
  artist: "",
  playlist: null,
};

export const PlayContext = createContext({
  isPlaying: defaultPlayValues.isPlaying,
  isLoading: defaultPlayValues.isLoading,
  title: defaultPlayValues.title,
  setTitle: (_: string) => {},
  artist: defaultPlayValues.artist,
  playlist: defaultPlayValues.playlist,
  setPlaylist: (_: IPlaylist | null) => {},
});

export const PlayContextProvider: FC<{
  children?: ReactNode | undefined;
}> = ({ children }) => {
  const [title, setTitle] = useState(defaultPlayValues.title);
  const [playlist, setPlaylist] = useState(defaultPlayValues.playlist);

  return (
    <PlayContext.Provider
      value={{
        isPlaying: false,
        isLoading: false,
        title,
        setTitle,
        artist: "",
        playlist,
        setPlaylist,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};
