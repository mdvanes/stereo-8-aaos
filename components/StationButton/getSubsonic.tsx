import React, { FC, useEffect, useRef, useState } from "react";
import { Button, FlatList, View, StyleSheet, StatusBar } from "react-native";
import { Audio } from "expo-av";
// @ts-expect-error
import md5 from "md5";
import { Text } from "../Themed";
import settings from "./settings.json";

const API_DOMAIN = settings.subsonic.domain;
const API_USER = settings.subsonic.user;
const API_SALT = settings.subsonic.salt;
const API_TOKEN = md5(settings.subsonic.password + API_SALT);
const API_CONFIG = `?u=${API_USER}&t=${API_TOKEN}&s=${API_SALT}&v=1.16.0&c=Stereo8&f=json`;

const getAPI = (method: string, option = "") =>
  API_DOMAIN + method + API_CONFIG + option;

interface SubsonicNowPlaying {
  id: string;
  title: string;
  album: string;
  artist: string;
}

export const getNowPlaying = async (): Promise<SubsonicNowPlaying | null> => {
  try {
    const response = await fetch(getAPI("getNowPlaying"));
    const json = await response.json();
    const { nowPlaying } = json["subsonic-response"];
    if (nowPlaying?.entry && nowPlaying.entry[0]) {
      const { artist, title } = nowPlaying.entry[0];
      console.log(`Now playing: ${artist} - ${title}`);
      return nowPlaying.entry[0];
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

export const SubsonicButton: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pbo, setPbo] = useState<Audio.Sound | null>(null);
  const [meta, setMeta] = useState<SubsonicNowPlaying | null>(null);

  const init = async () => {
    const newMeta = await getNowPlaying();
    const id = newMeta?.id ?? '5716';
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: getAPI("stream", `&id=${id}`) },
      { shouldPlay: false }
    );
    setPbo(playbackObject);
  };

  useEffect(() => {
    init();
  }, []);

  const onToggle = async () => {
    const newMeta = await getNowPlaying();
    setMeta(newMeta);
    if (pbo) {
      if (isPlaying) {
        await pbo.pauseAsync();
      } else {
        await pbo.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <>
      {" "}
      <Text lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
        {meta
          ? `Now playing: ${meta.artist} - ${meta.title}`
          : "Nothing playing"}
      </Text>
      <Button
        onPress={onToggle}
        title={`${isPlaying ? "Pause" : "Play"} Subsonic`}
      />
    </>
  );
};
