import { FontAwesome } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Image, Pressable, Text, View } from "react-native";
import {
  PlayContext,
  PlayContextProvider,
} from "../components/context/play-context";
import { styles } from "../components/item.styles";
import { SoundWrapper } from "../components/SoundWrapper/SoundWrapper";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import { RootStackParamList, RootStackScreenProps } from "../types";
import { BackButton } from "./BackButton";
import LinkingConfiguration from "./LinkingConfiguration";
import { stackScreenPlaylistsOptions } from "./stackScreenPlaylistsOptions";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const PlaylistTitle = () => {
  const context = React.useContext(PlayContext);
  return (
    <View>
      <Text style={styles.topbarTitle}>{context.playlist?.name}</Text>
    </View>
  );
};

function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <PlayContextProvider>
      <SoundWrapper />
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Playlists"
            component={PlaylistsScreen}
            options={stackScreenPlaylistsOptions(colorScheme)}
          />
          <Stack.Screen
            name="Playlist"
            component={PlaylistScreen}
            options={({ navigation }: RootStackScreenProps<"Playlist">) => ({
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
            })}
          />
        </Stack.Group>
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="Modal"
            component={ModalScreen}
            options={({ navigation }: RootStackScreenProps<"Modal">) => ({
              title: "Settings",
              headerTitleStyle: { fontSize: 38 },
              headerLeft: () => <BackButton navigation={navigation} />,
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </PlayContextProvider>
  );
}
