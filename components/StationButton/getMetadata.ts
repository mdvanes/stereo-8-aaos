import {
  NowPlayingResponse,
  PreviouslyPlayedItem,
} from "../context/play-context";
import { getRadioMetaData } from "@mdworld/radio-metadata";
import { IRadioSetting } from "../../getSettings";

// require does not resolve within getMeta
const bgMap: Record<string, string> = {
  "Sky Radio": require("../../assets/images/sky-radio.jpg"),
  "Pinguin Radio": require("../../assets/images/pinguin-radio.jpg"),
};

const getMeta = async (
  radioSetting: IRadioSetting
): Promise<NowPlayingResponse | null> => {
  const { name: channelName, schema } = radioSetting;

  if (!schema) {
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
    const tracks = await getRadioMetaData(schema);
    const lastTrack = tracks[0];
    const { song, broadcast, time } = lastTrack;

    const previouslyPlayed = tracks.map(
      (track): PreviouslyPlayedItem => ({
        time:
          // TODO fix timestamp for Sky
          track.time?.end && track.time.end.length >= 19
            ? `${new Date(
                `${track.time?.end.slice(0, 19)}.000+01:00`
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "",
        artist: track.song.artist ?? "",
        title: track.song.title ?? "",
      })
    );

    return {
      artist: song.artist ?? "",
      title: song.title,
      broadcastTitle: broadcast?.title ?? channelName,
      img:
        song.imageUrl ??
        broadcast?.imageUrl ??
        radioSetting.fallBackImageUrl ??
        undefined,
      last_updated: time?.end,
      presenters: broadcast?.presenters,
      previouslyPlayed,
      id: "0",
      duration: -1,
      isDir: false,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateMeta = async ({
  context,
  radioSetting,
}: {
  context: {
    setSong: (_: NowPlayingResponse | null) => void;
    setPreviouslyPlayed: (_: PreviouslyPlayedItem[]) => void;
  };
  radioSetting: IRadioSetting;
}) => {
  const meta = await getMeta(radioSetting);
  context.setSong(meta);
  if (meta?.previouslyPlayed) {
    context.setPreviouslyPlayed(meta.previouslyPlayed);
  }
};
