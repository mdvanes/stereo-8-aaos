import { createContext, FC, ReactNode, useState } from "react";
import { IPlaylist } from "../Subsonic/getSubsonic";
import { Audio } from "expo-av";
import { IndexItem, LibraryItemType, MusicDirectorySong } from "../../types";

export interface PreviouslyPlayedItem {
  time: string;
  artist: string;
  title: string;
}

export interface PlayValues {
  isPlaying: boolean;
  isRadioPlaying: boolean;
  isLoading: boolean;
  playlist: IPlaylist | null;
  song: MusicDirectorySong | null;
  queue: MusicDirectorySong[] | null;
  startSongId: string | null;
  pbo: Audio.Sound | null;
  previouslyPlayed: { time: string; artist: string; title: string }[];
  libraryIndexes: IndexItem[];
  libraryItems: LibraryItemType[];
  libraryBreadcrumb: LibraryItemType[];
  favoritesDirItems: LibraryItemType[] | null;
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
  previouslyPlayed: [],
  libraryIndexes: [],
  libraryItems: [],
  libraryBreadcrumb: [],
  favoritesDirItems: null,
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
  setSong: (_: MusicDirectorySong | null) => {},
  queue: defaultPlayValues.queue,
  setQueue: (_: PlayValues["queue"]) => {},
  startSongId: defaultPlayValues.startSongId,
  setStartSongId: (_: PlayValues["startSongId"]) => {},
  pbo: defaultPlayValues.pbo,
  setPbo: (_: PlayValues["pbo"]) => {},
  previouslyPlayed: defaultPlayValues.previouslyPlayed,
  setPreviouslyPlayed: (_: PlayValues["previouslyPlayed"]) => {},
  libraryIndexes: defaultPlayValues.libraryIndexes,
  setLibraryIndexes: (_: PlayValues["libraryIndexes"]) => {},
  libraryItems: defaultPlayValues.libraryItems,
  setLibraryItems: (_: PlayValues["libraryItems"]) => {},
  libraryBreadcrumb: defaultPlayValues.libraryBreadcrumb,
  setLibraryBreadcrumb: (
    _:
      | PlayValues["libraryBreadcrumb"]
      | ((
          _: PlayValues["libraryBreadcrumb"]
        ) => PlayValues["libraryBreadcrumb"])
  ) => {},
  favoritesDirItems: defaultPlayValues.favoritesDirItems,
  setFavoritesDirItems: (_: PlayValues["favoritesDirItems"]) => {},
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
  const [pbo, setPbo] = useState<PlayValues["pbo"]>(defaultPlayValues.pbo);
  const [previouslyPlayed, setPreviouslyPlayed] = useState(
    defaultPlayValues.previouslyPlayed
  );
  const [libraryIndexes, setLibraryIndexes] = useState(
    defaultPlayValues.libraryIndexes
  );
  const [libraryItems, setLibraryItems] = useState(
    defaultPlayValues.libraryItems
  );
  const [libraryBreadcrumb, setLibraryBreadcrumb] = useState(
    defaultPlayValues.libraryBreadcrumb
  );
  const [favoritesDirItems, setFavoritesDirItems] = useState<
    PlayValues["favoritesDirItems"]
  >(defaultPlayValues.favoritesDirItems);

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
        previouslyPlayed,
        setPreviouslyPlayed,
        libraryIndexes,
        setLibraryIndexes,
        libraryItems,
        setLibraryItems,
        libraryBreadcrumb,
        setLibraryBreadcrumb,
        favoritesDirItems,
        setFavoritesDirItems,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};
