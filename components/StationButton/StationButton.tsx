import { FontAwesome } from "@expo/vector-icons";
import React, { FC, useContext, useState } from "react";
import { Pressable, View, Image } from "react-native";
import Colors from "../../constants/Colors";
import { HEADER_ICON_SIZE } from "../../constants/Layout";
import { IRadioSetting, ISettings } from "../../getSettings";
import useColorScheme from "../../hooks/useColorScheme";
import { PlayContext } from "../context/play-context";

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

interface IStationButtonProps {
  config: IRadioSetting;
}

export const StationButton: FC<IStationButtonProps> = ({ config }) => {
  const {
    name: channelName,
    channelUrl,
    metaTracksUrl,
    metaBroadcastUrl,
  } = config;
  const colorScheme = useColorScheme();
  const context = useContext(PlayContext);

  const onToggle = async () => {
    const meta = await getMeta(metaTracksUrl, metaBroadcastUrl);
    if (context.pbo) {
      // Stop playing songs, get ready for stream
      context.setStartSongId(null);
      context.setIsPlaying(false);
      if (context.isRadioPlaying) {
        await context.pbo.pauseAsync();
      } else {
        await context.pbo.unloadAsync();
        await context.pbo.loadAsync({
          uri: channelUrl,
        });
        await context.pbo.playAsync();
      }
      context.setSong({
        id: "0",
        title: meta?.title || channelName,
        artist: `${meta?.artist} (${meta?.name})`,
        duration: -1,
        img: meta ? meta.songImageUrl ?? meta.imageUrl : undefined,
      });
      context.setIsRadioPlaying(!context.isRadioPlaying);
    }
  };

  return (
    <View>
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <FontAwesome
          name={context.isRadioPlaying ? "pause-circle" : "music"}
          size={HEADER_ICON_SIZE}
          color={Colors[colorScheme].text}
        />
      </Pressable>
    </View>
  );
};
