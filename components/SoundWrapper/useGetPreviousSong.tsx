import { useContext } from "react";
import { MusicDirectorySong } from "../../types";
import { PlayContext } from "../context/play-context";

export const useGetPreviousSong = () => {
  const context = useContext(PlayContext);

  const getPreviousSong = (): MusicDirectorySong | null => {
    if (context.queue) {
      const prevIndex = context.queue?.findIndex(
        (queueItem) => queueItem.id === context.startSongId
      );

      const isFirst = prevIndex <= 0;

      if (isFirst) {
        // Wrap around to last song
        return context.queue[context.queue.length - 1];
      }

      const prevSong = context.queue.slice(prevIndex - 1)[0];
      console.log("previous song:", prevSong);
      return prevSong;
    }
    return null;
  };

  return { getPreviousSong };
};
