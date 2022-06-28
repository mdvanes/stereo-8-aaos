import React, { FC, useEffect, useState } from "react";
import { Audio } from "expo-av";
// @ts-expect-error
import md5 from "md5";
import { ListItemButton } from "./ListItemButton";
import { getSettings } from "../../getSettings";

const PLAYER_NAME = "Stereo8";

const settings = getSettings();

const API_DOMAIN = settings?.subsonic?.domain ?? "";
const API_USER = settings?.subsonic?.user ?? "";
const API_SALT = settings?.subsonic?.salt ?? "";
const API_TOKEN = md5((settings?.subsonic?.password ?? "") + API_SALT);
const API_CONFIG = `?u=${API_USER}&t=${API_TOKEN}&s=${API_SALT}&v=1.16.0&c=${PLAYER_NAME}&f=json`;

const getAPI = (method: string, option = "") =>
  API_DOMAIN + method + API_CONFIG + option;

interface SubsonicNowPlaying {
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

const getCurrentRemotePlayingId = async (): Promise<string> => {
  const newMeta = await getNowPlaying({ remote: true });
  // Between 1000 and 5716
  const randomId = `${Math.floor(Math.random() * 4716) + 1000}`;
  const id = newMeta?.id ?? randomId;
  return id;
};

export const SubsonicButton: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pbo, setPbo] = useState<Audio.Sound | null>(null);
  const [meta, setMeta] = useState<SubsonicNowPlaying | null>(null);

  const init = async () => {
    const id = await getCurrentRemotePlayingId();
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: getAPI("stream", `&id=${id}`) },
      { shouldPlay: false }
    );
    setPbo(playbackObject);
  };

  useEffect(() => {
    if (API_DOMAIN) {
      throw new Error("Settings not complete");
    }
    init();
  }, []);

  const onToggle = async () => {
    if (pbo) {
      if (isPlaying) {
        await pbo.pauseAsync();
      } else {
        await pbo.unloadAsync();
        const id = await getCurrentRemotePlayingId();
        await pbo.loadAsync({ uri: getAPI("stream", `&id=${id}`) });
        await pbo.playAsync();
      }
      setIsPlaying(!isPlaying);
      setTimeout(async () => {
        const newMeta = await getNowPlaying({ remote: false });
        setMeta(newMeta);
      }, 500);
    }
  };

  return (
    <ListItemButton
      text={`Subsonic: ${
        meta ? `${meta.artist} - ${meta.title}` : "Nothing playing"
      }`}
      title={isPlaying ? "pause" : "play"}
      onClick={onToggle}
    />
  );
};
