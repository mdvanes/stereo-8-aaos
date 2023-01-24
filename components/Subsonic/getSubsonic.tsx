import md5 from "md5";
import { getSettings, ISettings } from "../../getSettings";

const PLAYER_NAME = "Stereo8";

let API_DOMAIN = "";
let API_USER;
let API_SALT;
let API_TOKEN;
let API_CONFIG = "";

const run = async () => {
  const settings: ISettings = await getSettings();

  API_DOMAIN = settings?.subsonic?.domain ?? "";
  API_USER = settings?.subsonic?.user ?? "";
  API_SALT = settings?.subsonic?.salt ?? "";
  API_TOKEN = md5((settings?.subsonic?.password ?? "") + API_SALT);
  API_CONFIG = `?u=${API_USER}&t=${API_TOKEN}&s=${API_SALT}&v=1.16.0&c=${PLAYER_NAME}&f=json`;
};

run();

export const getAPI = (method: string, option = "") =>
  API_DOMAIN + method + API_CONFIG + option;

export const hasValidSettings = () => {
  return API_DOMAIN.length > 0 && API_USER.length > 0;
};

export interface SubsonicNowPlaying {
  id: string;
  title: string;
  album: string;
  artist: string;
  duration: number;
  playerName?: string;
}

export interface IPlaylist {
  id: string;
  name: string;
}

export interface ISong {
  id: string;
  artist: string;
  title: string;
  duration: number;
  album?: string;
  img?: string;
}

export const testConnection = async (): Promise<void> => {
  await fetch(getAPI("getPlaylists")).then((data) => data.json());
};

export const getPlaylists = async (): Promise<IPlaylist[]> => {
  try {
    const response = await fetch(getAPI("getPlaylists")).then((data) =>
      data.json()
    );
    const { playlists } = response["subsonic-response"];
    if (playlists.playlist) {
      return (playlists.playlist as IPlaylist[]).map(({ id, name }) => ({
        id,
        name,
      }));
    }
    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getPlaylist = async (id: string): Promise<ISong[]> => {
  try {
    const response = await fetch(getAPI("getPlaylist", `&id=${id}`)).then(
      (data) => data.json()
    );
    const { playlist } = response["subsonic-response"];

    if (playlist?.entry) {
      const songs = (playlist.entry as ISong[]).map(
        ({ id, artist, title, duration }) => {
          return { id, artist, title, duration };
        }
      );
      return songs;
    }
    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getNowPlaying = async ({
  remote,
}: {
  remote: boolean;
}): Promise<SubsonicNowPlaying | null> => {
  try {
    const response = await fetch(getAPI("getNowPlaying"));
    const json = await response.json();
    const { nowPlaying } = json["subsonic-response"];
    const entry =
      ((nowPlaying?.entry as SubsonicNowPlaying[]) ?? []).filter((p) => {
        if (remote) {
          return p.playerName !== PLAYER_NAME;
        } else {
          return p.playerName === PLAYER_NAME;
        }
      }) || [];
    if (entry && entry.length > 0) {
      const { artist, title } = entry[0];
      console.log(`Now playing: ${artist} - ${title}`);
      return entry[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCurrentRemotePlayingId = async (): Promise<
  string | undefined
> => {
  const newMeta = await getNowPlaying({ remote: true });
  return newMeta?.id;
};
