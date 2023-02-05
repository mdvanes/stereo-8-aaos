import { FontAwesome } from "@expo/vector-icons";
import React, { FC, useContext, useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import Colors from "../../../constants/Colors";
import { PlayContext } from "../../context/play-context";
import { styles } from "./Library.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const favoritesStoreKey = "@favorites";

const addFavorite = async (id: string) => {
  const rawStored = await AsyncStorage.getItem(favoritesStoreKey);
  const favoritesList: string[] = rawStored ? JSON.parse(rawStored) : [];
  await AsyncStorage.setItem(
    favoritesStoreKey,
    JSON.stringify([...favoritesList, id])
  );
};

const removeFavorite = async (id: string) => {
  const rawStored = await AsyncStorage.getItem(favoritesStoreKey);
  const favoritesList: string[] = rawStored ? JSON.parse(rawStored) : [];
  const newFavoritesList = favoritesList.filter((f) => f !== id);
  await AsyncStorage.setItem(
    favoritesStoreKey,
    JSON.stringify(newFavoritesList)
  );
};

const getIsFavorite = async (id: string): Promise<boolean> => {
  const rawStored = await AsyncStorage.getItem(favoritesStoreKey);
  const favoritesList: string[] = rawStored ? JSON.parse(rawStored) : [];
  return favoritesList.some((f) => f === id);
};

export const FavoriteButton: FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const context = useContext(PlayContext);
  const lastDir = context.libraryBreadcrumb.slice(-1)[0];

  useEffect(() => {
    const run = async () => {
      if (lastDir.id) {
        const f = await getIsFavorite(lastDir.id);
        setIsFavorite(f);
      }
    };
    run();
  }, [lastDir.id]);

  return (
    <Text style={[styles.libraryItem]}>
      <Pressable
        style={{ paddingVertical: 20, paddingLeft: 20, paddingRight: 10 }}
        onPress={async () => {
          if (lastDir.id) {
            if (isFavorite) {
              removeFavorite(lastDir.id);
            } else {
              addFavorite(lastDir.id);
            }
            setIsFavorite(() => !isFavorite);
          }
        }}
      >
        <FontAwesome
          name={isFavorite ? "star" : "star-o"}
          size={30}
          color={Colors["dark"].text}
        />
      </Pressable>{" "}
    </Text>
  );
};
