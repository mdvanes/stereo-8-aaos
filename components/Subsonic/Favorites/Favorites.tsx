import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, SectionList } from "react-native";
import { favoritesStoreKey } from "../../../constants/StorageKeys";
import { LibraryItemType } from "../../../types";
import { PlayContext } from "../../context/play-context";
import { LibraryItem } from "../Library/LibraryItem";
import { sortFavorites } from "./sortFavorites";

const getFavorites = async () => {
  const rawStored = await AsyncStorage.getItem(favoritesStoreKey);
  const favoritesList: LibraryItemType[] = rawStored
    ? JSON.parse(rawStored)
    : [];

  return favoritesList;
};

const pullToRefresh: LibraryItemType = {
  album: "",
  title: "",
  artist: "",
  isDir: true,
  id: "-1",
};

export const Favorites: FC = () => {
  const context = useContext(PlayContext);
  const [favorites, setFavorites] = useState<LibraryItemType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const init = async () => {
    setRefreshing(true);
    try {
      const favoritesList = await getFavorites();
      favoritesList.sort(sortFavorites);
      setFavorites(favoritesList.length > 0 ? favoritesList : [pullToRefresh]);
    } catch (err) {
      alert(err);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    init();
  }, []);

  const onRefresh = useCallback(async () => {
    init();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <SectionList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        sections={[
          {
            title: "",
            data: context.favoritesDirItems || favorites,
          },
        ]}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => (
          <LibraryItem
            item={item}
            items={context.favoritesDirItems ?? []}
            isActive={context.song?.id === item.id}
            isFavoritesContext
          />
        )}
      />
    </SafeAreaView>
  );
};
