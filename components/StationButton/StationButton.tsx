import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-native";
import { Audio } from "expo-av";
// @ts-expect-error
import md5 from "md5";
import { Text } from "../Themed";
import settings from "./settings.json";

const channelUrl = `https://icecast.omroep.nl/radio2-bb-mp3`;

const getMovies = async () => {
  try {
    const response = await fetch("https://reactnative.dev/movies.json");
    const json = await response.json();
    console.log(json);
    //  setData(json.movies);
  } catch (error) {
    console.error(error);
  } finally {
    //  setLoading(false);
  }
};

const API_DOMAIN = settings.subsonic.domain;
const API_USER = settings.subsonic.user;
const API_SALT = settings.subsonic.salt;
const API_TOKEN = md5(settings.subsonic.password + API_SALT);
const API_CONFIG = `?u=${API_USER}&t=${API_TOKEN}&s=${API_SALT}&v=1.16.0&c=Stereo8&f=json`;

const getAPI = (method: string, option = "") =>
  API_DOMAIN + method + API_CONFIG + option;

const getSubsonic = async () => {
  try {
    const response = await fetch(getAPI("getNowPlaying"));
    const json = await response.json();
    // console.log(json);
    const { artist, title } = json["subsonic-response"].nowPlaying.entry[0];
    console.log(`Now playing: ${artist} - ${title}`);
    //  setData(json.movies);
  } catch (error) {
    console.error(error);
  } finally {
    //  setLoading(false);
  }
};

// TODO extract channelUrl and label to props
export const StationButton = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pbo, setPbo] = useState<Audio.Sound | null>(null);

  const init = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: channelUrl },
      { shouldPlay: false }
    );
    setPbo(playbackObject);
  };

  useEffect(() => {
    init();
    getMovies();
    getSubsonic();
  }, []);

  const onToggle = async () => {
    if (pbo) {
      if (isPlaying) {
        await pbo.pauseAsync();
      } else {
        //   elem.src = `${channelUrl}?${Date.now()}`;
        await pbo.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <Button onPress={onToggle} title="Play NPO Radio 2" />
      <Text lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
        {isPlaying ? "PLAYING" : "STOPPED"}
      </Text>
    </>
  );
};
