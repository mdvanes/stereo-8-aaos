import { ISong } from "../Subsonic/getSubsonic";

interface NowPlayingResponse {
  artist: string;
  title: string;
  last_updated: string;
  songImageUrl: string;
  name: string;
  imageUrl: string;
}

interface TracksResponse {
  data: [
    {
      artist: string;
      title: string;
      image_url_400x400?: string;
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

    // Testing a view of previous played songs
    const previouslyPlayed = nowonairResponse.data.map(
      (n) =>
        // @ts-expect-error add startdatetime to type
        `${new Date(`${n.startdatetime}.000+01:00`).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} ${n.artist} - ${n.title}`
    );
    console.log(previouslyPlayed.join("\n"));

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
    setSong: (_: ISong | null) => void;
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
  });
};
