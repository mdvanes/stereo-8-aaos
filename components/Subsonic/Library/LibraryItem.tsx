import { FontAwesome } from "@expo/vector-icons";
import React, { FC, useContext } from "react";
import { Pressable, Text } from "react-native";
import {
  Artist,
  LibraryItemType,
  MusicDirectoryAlbum,
  MusicDirectorySong,
} from "../../../types";
import { PlayContext } from "../../context/play-context";
import { styles as itemStyles } from "../../item.styles";
import { getMusicDir } from "../getSubsonic";
import { getLabel, isAlbum, isArtist, isSong } from "./getLabel";
import { styles } from "./Library.styles";

const LibraryDirItem: FC<{
  item: Artist | MusicDirectoryAlbum;
}> = ({ item }) => {
  const context = useContext(PlayContext);
  const label = getLabel(item);

  return (
    <Pressable
      style={itemStyles.item_pressable}
      onPress={async () => {
        const dirs = await getMusicDir(item.id ?? "");
        context.setLibraryBreadcrumb((prev: string[]) => [...prev, item]);
        context.setLibraryItems(dirs);
      }}
    >
      <Text style={[styles.libraryItem, itemStyles.line]}>
        <FontAwesome name="folder" size={20} style={{ marginRight: 15 }} />{" "}
        {label}
      </Text>
    </Pressable>
  );
};

const LibrarySongItem: FC<{
  item: MusicDirectorySong;
  items?: MusicDirectorySong[];
  isActive: boolean;
}> = ({ item, items, isActive }) => {
  const context = useContext(PlayContext);

  const track = item.track ? `${item.track?.toString().padStart(2, "0")}.` : "";

  return (
    <Pressable
      style={itemStyles.item_pressable}
      onPress={async () => {
        context.setQueue(items ?? []);
        context.setStartSongId(item.id);
      }}
    >
      <Text
        style={[
          styles.libraryItem,
          itemStyles.line,
          isActive ? itemStyles.item__active : undefined,
        ]}
      >
        {track} {item.title}
      </Text>
    </Pressable>
  );
};

export const LibraryItem: FC<{
  item: LibraryItemType;
  items?: LibraryItemType[];
  isActive: boolean;
}> = ({ item, items, isActive = false }) => {
  if (isArtist(item) || isAlbum(item)) {
    return <LibraryDirItem item={item} />;
  }
  return (
    <LibrarySongItem
      item={item}
      items={items ? items.filter(isSong) : []}
      isActive={isActive}
    />
  );
};
