import { createContext, FC, ReactNode, useState } from "react";

export interface PlayValues {
  isPlaying: boolean;
  isLoading: boolean;
  title: string;
  artist: string;
  playlistId: string | null;
}

export const defaultPlayValues: PlayValues = {
  isPlaying: false,
  isLoading: false,
  title: "",
  artist: "",
  playlistId: null,
};

export const PlayContext = createContext({
  isPlaying: defaultPlayValues.isPlaying,
  isLoading: defaultPlayValues.isLoading,
  title: defaultPlayValues.title,
  setTitle: (_: string) => {},
  artist: defaultPlayValues.artist,
  playlistId: defaultPlayValues.playlistId,
  setPlaylistId: (_: string) => {},
});

export const PlayContextProvider: FC<{
  children?: ReactNode | undefined;
}> = ({ children }) => {
  const [title, setTitle] = useState(defaultPlayValues.title);
  const [playlistId, setPlaylistId] = useState(defaultPlayValues.playlistId);

  return (
    <PlayContext.Provider
      value={{
        isPlaying: false,
        isLoading: false,
        title,
        setTitle,
        artist: "",
        playlistId,
        setPlaylistId,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};
