import {
  NowPlayingResponse,
  PreviouslyPlayedItem,
} from "../context/play-context";

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

const bgMap: Record<string, string> = {
  "Sky Radio": require("../../assets/images/sky-radio.jpg"),
  "Pinguin Radio": require("../../assets/images/pinguin-radio.jpg"),
};

const getMeta = async (
  channelName: string,
  tracksURL: string,
  broadcastUrl: string
): Promise<NowPlayingResponse | null> => {
  if (!tracksURL || !broadcastUrl) {
    const mappedBg = bgMap[channelName];
    return {
      artist: "No meta data available",
      broadcastTitle: undefined,
      duration: -1,
      id: "0",
      img: mappedBg ?? undefined,
      isDir: false,
      last_updated: "",
      presenters: undefined,
      previouslyPlayed: [],
      title: channelName,
    };
  }

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

    const broadcastResponse: BroadcastResponse = await fetch(broadcastUrl).then(
      (data) => data.json()
    );

    const {
      title: broadcastTitle,
      presenters,
      image_url_400x400: presenterImg,
    } = broadcastResponse.data[0];

    return {
      artist,
      broadcastTitle,
      duration: -1,
      id: "0",
      img: songImg ?? presenterImg ?? undefined,
      isDir: false,
      last_updated: enddatetime,
      presenters,
      previouslyPlayed,
      title,
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
    setSong: (_: NowPlayingResponse | null) => void;
    setPreviouslyPlayed: (_: PreviouslyPlayedItem[]) => void;
  };
  metaTracksUrl: string;
  metaBroadcastUrl: string;
  channelName: string;
}) => {
  const meta = await getMeta(channelName, metaTracksUrl, metaBroadcastUrl);
  context.setSong(meta);
  if (meta?.previouslyPlayed) {
    context.setPreviouslyPlayed(meta.previouslyPlayed);
  }
};
