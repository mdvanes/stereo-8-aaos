import React, { useContext } from "react";
import { ColorSchemeName, Text, View } from "react-native";
import { PlayContext } from "../../components/context/play-context";
import { styles } from "../../components/item.styles";
import { RootStackScreenProps } from "../../types";
import { BackButton } from "../BackButton";
import { settingsNavButton } from "./playlist";

const FavoriteTitle = () => {
  const context = useContext(PlayContext);
  const firstItem = context.favoritesDirItems && context.favoritesDirItems[0];
  const firstItemAlbum =
    firstItem && "album" in firstItem ? firstItem.album : null;

  return (
    <View>
      <Text style={styles.topbarTitle}>{firstItemAlbum}</Text>
    </View>
  );
};

export const stackScreenFavoriteOptions =
  (colorScheme: NonNullable<ColorSchemeName>) =>
  ({ navigation }: RootStackScreenProps<"Favorite">) => ({
    headerTitle: () => <FavoriteTitle />,
    headerLeft: () => <BackButton navigation={navigation} />,
    headerRight: settingsNavButton(navigation),
  });
