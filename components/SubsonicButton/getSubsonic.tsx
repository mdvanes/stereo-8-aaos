import md5 from "md5";
import { getSettings } from "../../getSettings";

const PLAYER_NAME = "Stereo8";

const settings = getSettings();

const API_DOMAIN = settings?.subsonic?.domain ?? "";
const API_USER = settings?.subsonic?.user ?? "";
const API_SALT = settings?.subsonic?.salt ?? "";
const API_TOKEN = md5((settings?.subsonic?.password ?? "") + API_SALT);
const API_CONFIG = `?u=${API_USER}&t=${API_TOKEN}&s=${API_SALT}&v=1.16.0&c=${PLAYER_NAME}&f=json`;

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
  playerName?: string;
}

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
      (nowPlaying?.entry as SubsonicNowPlaying[]).filter((p) => {
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
  //  finally {
  //   //  setLoading(false);
  //   return
  // }
};

export const getCurrentRemotePlayingId = async (): Promise<string> => {
  const newMeta = await getNowPlaying({ remote: true });
  // Between 1000 and 5716
  const randomId = `${Math.floor(Math.random() * 4716) + 1000}`;
  const id = newMeta?.id ?? randomId;
  return id;
};
