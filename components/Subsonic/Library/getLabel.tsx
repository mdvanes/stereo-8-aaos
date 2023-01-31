import { FontAwesome } from "@expo/vector-icons";
import React, { FC, useContext, useEffect } from "react";
import { Pressable, SafeAreaView, SectionList, Text } from "react-native";
import {
  Artist,
  LibraryItemType,
  MusicDirectoryAlbum,
  MusicDirectorySong,
} from "../../../types";
import { PlayContext } from "../../context/play-context";
import { styles as itemStyles } from "../../item.styles";
import { View } from "../../Themed";
import { getIndexes, getMusicDir } from "../getSubsonic";
import { styles } from "./Library.styles";

export const isArtist = (item: LibraryItemType): item is Artist => {
  return "name" in item;
};

export const isAlbum = (item: LibraryItemType): item is MusicDirectoryAlbum => {
  return "isDir" in item && item.isDir;
};

export const getLabel = (item: LibraryItemType): string => {
  if (isArtist(item)) {
    return item.name ?? "";
  }
  if (isAlbum(item)) {
    return item.album ?? item.title ?? "";
  }
  return item.title ?? "";
};
