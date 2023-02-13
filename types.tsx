/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// See: https://reactnavigation.org/docs/typescript
export type RootStackParamList = {
  Home: undefined;
  // Playlists: undefined; // NavigatorScreenParams<RootTabParamList> | undefined;
  Playlist: undefined; // NavigatorScreenParams<undefined> | undefined;
  Favorite: undefined;
  // Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Playlists: undefined;
  Playlist: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface Artist {
  id?: string;
  name?: string;
  coverArt?: string;
  albumCount?: number;
}

export interface IndexItem {
  name?: string;
  artist?: Artist[];
}

export interface IndexesResponse {
  indexes?: {
    ignoredArticles?: string;
    index?: IndexItem[];
  };
}

export interface MusicDirectory {
  id: string;
  artist: string;
  album?: string;
  isDir: boolean;
  title?: string;
  track?: number;
}

export interface MusicDirectoryAlbum extends MusicDirectory {
  isDir: true;
}

export interface MusicDirectorySong extends MusicDirectory {
  isDir: false;
  duration: number;
  img?: string;
}

export interface MusicDirectoryResponse {
  directory?: {
    id?: string;
    name?: string;
    child?: MusicDirectory[];
  };
}

export type LibraryItemType = Artist | MusicDirectoryAlbum | MusicDirectorySong;
