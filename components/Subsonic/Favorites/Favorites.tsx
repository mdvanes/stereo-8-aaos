import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useContext, useEffect, useState } from "react";
import { SafeAreaView, SectionList } from "react-native";
import { ConditionalImageBackground } from "../../ConditionalImageBackground";
import { PlayContext } from "../../context/play-context";
import { getIndexes, getMusicDir } from "../getSubsonic";
import { favoritesStoreKey } from "../Library/FavoriteButton";
import { LibraryItem } from "../Library/LibraryItem";

const getFavorites = async () => {
  const rawStored = await AsyncStorage.getItem(favoritesStoreKey);
  const favoritesIdsList: string[] = rawStored ? JSON.parse(rawStored) : [];
  const promises = favoritesIdsList.map((fid) => getMusicDir(fid));
  const favoritesList = await Promise.all(promises);

  console.log(favoritesIdsList, favoritesList);
  // TODO replace x[0].id by favoritesList.id. Or use getIndexes() to map ids to albums
  return favoritesList.map((x) => ({ id: x[0].id, name: x[0].album }));
};

export const Favorites: FC = () => {
  const context = useContext(PlayContext);
  const [favorites, setFavorites] = useState<any>([]);

  const init = async () => {
    try {
      const favoritesList = await getFavorites();
      setFavorites(favoritesList);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <ConditionalImageBackground img={context.song?.img}>
        <SectionList
          sections={[{ title: "", data: favorites }]}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          renderItem={({ item }) => (
            <LibraryItem
              item={item}
              items={context.libraryItems}
              isActive={false}
              // isActive={context.song?.id === item.id}
            />
          )}
        />
      </ConditionalImageBackground>
    </SafeAreaView>
  );
};
