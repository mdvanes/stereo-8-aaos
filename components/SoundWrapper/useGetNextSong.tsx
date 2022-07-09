import { useContext } from "react";
import { PlayContext } from "../context/play-context";
import { ISong } from "../SubsonicButton/getSubsonic";

export const useGetNextSong = () => {
  const context = useContext(PlayContext);

  const getNextSong = (): ISong | null => {
    // console.log("start play next", context.queue);
    if (context.queue) {
    //   console.log("start play next");
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
