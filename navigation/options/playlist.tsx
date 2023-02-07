import { FontAwesome } from "@expo/vector-icons";
import React, { useContext } from "react";
import { ColorSchemeName, Pressable, Text, View } from "react-native";
import { PlayContext } from "../../components/context/play-context";
import { styles } from "../../components/item.styles";
import Colors from "../../constants/Colors";
import { HEADER_ICON_SIZE } from "../../constants/Layout";
import { RootStackScreenProps } from "../../types";
import { BackButton } from "../BackButton";

const PlaylistTitle = () => {
  const context = useContext(PlayContext);
  return (
    <View>
      <Text style={styles.topbarTitle}>{context.playlist?.name}</Text>
    </View>
  );
};

export const settingsNavButton =
  (navigation: RootStackScreenProps<"Playlist" | "Favorite">["navigation"]) =>
  () =>
    (
      <Pressable
        onPress={() => navigation.navigate("Modal")}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <FontAwesome
          name="cog"
          size={HEADER_ICON_SIZE}
          color={Colors["dark"].text}
          style={{ marginRight: 15 }}
        />
      </Pressable>
    );

export const stackScreenPlaylistOptions =
  (colorScheme: NonNullable<ColorSchemeName>) =>
  ({ navigation }: RootStackScreenProps<"Playlist">) => ({
    headerTitle: () => <PlaylistTitle />,
    headerLeft: () => <BackButton navigation={navigation} />,
    headerRight: settingsNavButton(navigation),
  });
