import { useContext } from "react";
import { MusicDirectorySong } from "../../types";
import { PlayContext } from "../context/play-context";

export const useGetNextSong = () => {
  const context = useContext(PlayContext);

  const getNextSong = (): MusicDirectorySong | null => {
    if (context.queue) {
      const nextIndex =
        (context.queue?.findIndex(
          (queueItem) => queueItem.id === context.startSongId
        ) ?? -1) + 1;
      const nextSong =
        context.queue.length > nextIndex
          ? context.queue[nextIndex]
          : context.queue[0];
      console.log("next song:", nextSong);
      return nextSong;
    }
    return null;
  };

  return { getNextSong };
};
