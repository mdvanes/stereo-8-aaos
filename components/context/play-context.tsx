import { createContext, FC, ReactNode, useState } from "react";

export interface PlayValues {
  isPlaying: boolean;
  isLoading: boolean;
  title: string;
  artist: string;
}

export const defaultPlayValues: PlayValues = {
  isPlaying: false,
  isLoading: false,
  title: "",
  artist: "",
};

export const PlayContext = createContext({
  isPlaying: defaultPlayValues.isPlaying,
  isLoading: defaultPlayValues.isLoading,
  title: defaultPlayValues.title,
  setTitle: (_: string) => {},
  artist: defaultPlayValues.artist,
});

export const PlayContextProvider: FC<{
  children?: ReactNode | undefined;
}> = ({ children }) => {
  const [title, setTitle] = useState(defaultPlayValues.title);

  return (
    <PlayContext.Provider
      value={{
        isPlaying: false,
        isLoading: false,
        title,
        setTitle,
        artist: "",
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};
