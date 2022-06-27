import React, { useEffect, useRef, useState } from "react";
import { Button, FlatList, View, StyleSheet, StatusBar } from "react-native";
import { Audio } from "expo-av";
// @ts-expect-error
import md5 from "md5";
import { Text } from "../Themed";
import settings from "./settings.json";

// const channelUrl = `https://icecast.omroep.nl/radio2-bb-mp3`;

const API_DOMAIN = settings.subsonic.domain;
const API_USER = settings.subsonic.user;
const API_SALT = settings.subsonic.salt;
const API_TOKEN = md5(settings.subsonic.password + API_SALT);
const API_CONFIG = `?u=${API_USER}&t=${API_TOKEN}&s=${API_SALT}&v=1.16.0&c=Stereo8&f=json`;

const getAPI = (method: string, option = "") =>
  API_DOMAIN + method + API_CONFIG + option;

export const getSubsonic = async () => {
  try {
    const response = await fetch(getAPI("getNowPlaying"));
    const json = await response.json();
    // console.log(json);
    const {nowPlaying} = json["subsonic-response"];
    if(nowPlaying?.entry && nowPlaying.entry[0]) {
      const { artist, title } = nowPlaying.entry[0];
      console.log(`Now playing: ${artist} - ${title}`);
      //  setData(json.movies);
    } else {
      console.log('no entries')
    }
  } catch (error) {
    console.error(error);
  } finally {
    //  setLoading(false);
  }
};


