import {
  Artist,
  LibraryItemType,
  MusicDirectoryAlbum,
  MusicDirectorySong
} from "../../../types";

export const isArtist = (item: LibraryItemType): item is Artist => {
  return "name" in item;
};

export const isAlbum = (item: LibraryItemType): item is MusicDirectoryAlbum => {
  return "isDir" in item && item.isDir;
};

export const isSong = (item: LibraryItemType): item is MusicDirectorySong => {
  return "isDir" in item && !item.isDir;
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
