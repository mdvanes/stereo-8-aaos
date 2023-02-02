import { MusicDirectorySong } from "../../types";
import { PreviouslyPlayedItem } from "../context/play-context";

interface NowPlayingResponse {
  artist: string;
  title: string;
  last_updated: string;
  songImageUrl: string;
  name: string;
  imageUrl: string;
  previouslyPlayed: PreviouslyPlayedItem[];
}

interface TracksResponse {
  data: [
    {
      artist: string;
      title: string;
      image_url_400x400?: string;
      startdatetime: string;
      enddatetime: string;
    }
  ];
}

interface BroadcastResponse {
  data: [{ title: string; presenters?: string; image_url_400x400?: string }];
}

const getMeta = async (
  tracksURL: string,
  broadcastUrl: string
): Promise<NowPlayingResponse | null> => {
  try {
    const nowonairResponse: TracksResponse = await fetch(tracksURL).then(
      (data) => data.json()
    );

    const {
      artist,
      title,
      image_url_400x400: songImg,
      enddatetime,
    } = nowonairResponse.data[0];

    const previouslyPlayed: PreviouslyPlayedItem[] = nowonairResponse.data.map(
      (n) => ({
        // `${new Date(`${n.startdatetime}.000+01:00`).toLocaleTimeString([], {
        //   hour: "2-digit",
        //   minute: "2-digit",
        // })} ${n.artist} - ${n.title}`
        time: `${new Date(`${n.startdatetime}.000+01:00`).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )}`,
        artist: n.artist,
        title: n.title,
      })
    );
    // .join("\n");

    const broadcastResponse: BroadcastResponse = await fetch(broadcastUrl).then(
      (data) => data.json()
    );

    const {
      title: name,
      presenters,
      image_url_400x400: presenterImg,
    } = broadcastResponse.data[0];

    const presentersSuffix = presenters ? ` / ${presenters}` : "";

    return {
      artist,
      title,
      last_updated: enddatetime,
      songImageUrl: songImg ?? "",
      name: `${name}${presentersSuffix}`,
      imageUrl: presenterImg ?? "",
      previouslyPlayed,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateMeta = async ({
  context,
  metaTracksUrl,
  metaBroadcastUrl,
  channelName,
}: {
  context: {
    setSong: (_: MusicDirectorySong | null) => void;
    setPreviouslyPlayed: (_: PreviouslyPlayedItem[]) => void;
  };
  metaTracksUrl: string;
  metaBroadcastUrl: string;
  channelName: string;
}) => {
  const meta = await getMeta(metaTracksUrl, metaBroadcastUrl);
  context.setSong({
    id: "0",
    title: meta?.title || channelName,
    artist: `${meta?.artist} (${meta?.name})`,
    duration: -1,
    img: meta ? meta.songImageUrl ?? meta.imageUrl : undefined,
    isDir: false,
  });
  if (meta?.previouslyPlayed) {
    context.setPreviouslyPlayed(meta.previouslyPlayed);
  }
};
