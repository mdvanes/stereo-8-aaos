import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { PlayContextProvider } from "../components/context/play-context";
import { ProgressContextProvider } from "../components/context/progress-context";
import { SoundWrapper } from "../components/SoundWrapper/SoundWrapper";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { stackScreenModalOptions } from "./options/modal";
import { stackScreenPlaylistOptions } from "./options/playlist";
import { stackScreenPlaylistsOptions } from "./options/playlists";

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

function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <PlayContextProvider>
      <ProgressContextProvider>
        <SoundWrapper />
        <Stack.Navigator
          screenOptions={{
            headerBackVisible: false,
          }}
        >
          <Stack.Screen
            name="Playlists"
            component={PlaylistsScreen}
            options={stackScreenPlaylistsOptions(colorScheme)}
          />
          <Stack.Screen
            name="Playlist"
            component={PlaylistScreen}
            options={stackScreenPlaylistOptions(colorScheme)}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="Modal"
              component={ModalScreen}
              options={stackScreenModalOptions(colorScheme)}
            />
          </Stack.Group>
        </Stack.Navigator>
      </ProgressContextProvider>
    </PlayContextProvider>
  );
}
