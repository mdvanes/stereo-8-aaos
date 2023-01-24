import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { ColorSchemeName, Pressable, Text, View } from "react-native";
import { PlayContext } from "../../components/context/play-context";
import { styles } from "../../components/item.styles";
import Colors from "../../constants/Colors";
import { RootStackScreenProps } from "../../types";
import { BackButton } from "../BackButton";

const PlaylistTitle = () => {
  const context = React.useContext(PlayContext);
  return (
    <View>
      <Text style={styles.topbarTitle}>{context.playlist?.name}</Text>
    </View>
  );
};

export const stackScreenPlaylistOptions =
  (colorScheme: NonNullable<ColorSchemeName>) =>
  ({ navigation }: RootStackScreenProps<"Playlist">) => ({
    headerTitle: () => <PlaylistTitle />,
    headerLeft: () => <BackButton navigation={navigation} />,
    headerRight: () => (
      <Pressable
        onPress={() => navigation.navigate("Modal")}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <FontAwesome
          name="cog"
          size={60}
          color={Colors[colorScheme].text}
          style={{ marginRight: 15 }}
        />
      </Pressable>
    ),
  });
