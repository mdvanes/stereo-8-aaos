import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, SectionList } from "react-native";
import { LibraryItemType } from "../../../types";
import { ConditionalImageBackground } from "../../ConditionalImageBackground";
import { PlayContext } from "../../context/play-context";
import { favoritesStoreKey } from "../Library/FavoriteButton";
import { LibraryItem } from "../Library/LibraryItem";

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
      <ConditionalImageBackground img={context.song?.img}>
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
      </ConditionalImageBackground>
    </SafeAreaView>
  );
};
