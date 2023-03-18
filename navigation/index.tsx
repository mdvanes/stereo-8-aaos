import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { ColorSchemeName } from "react-native";
import { KeyListenerContextProvider } from "../components/context/key-listener-context";
import { PlayContextProvider } from "../components/context/play-context";
import { ProgressContextProvider } from "../components/context/progress-context";
import {
  ReloadContext,
  ReloadContextProvider,
} from "../components/context/reload-context";
import { ReloadIndicator } from "../components/Settings/ReloadIndicator";
import { SoundWrapper } from "../components/SoundWrapper/SoundWrapper";
import useColorScheme from "../hooks/useColorScheme";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import ModalScreen from "../screens/ModalScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import { RootStackParamList } from "../types";
import { HomeTabs } from "./HomeTabs";
import LinkingConfiguration from "./LinkingConfiguration";
import { stackScreenFavoriteOptions } from "./options/favorite";
import { stackScreenHomeOptions } from "./options/home";
import { stackScreenModalOptions } from "./options/modal";
import { stackScreenPlaylistOptions } from "./options/playlist";

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
      <ReloadContextProvider>
        <RootNavigator />
      </ReloadContextProvider>
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
  const reloadContext = useContext(ReloadContext);

  return reloadContext.disabled ? (
    <ReloadIndicator />
  ) : (
    <PlayContextProvider>
      <ProgressContextProvider>
        <KeyListenerContextProvider>
          <SoundWrapper />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerBackVisible: false,
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeTabs}
              options={stackScreenHomeOptions(colorScheme)}
            />
            <Stack.Screen
              name="Playlist"
              component={PlaylistScreen}
              options={stackScreenPlaylistOptions(colorScheme)}
            />
            <Stack.Screen
              name="Favorite"
              component={FavoritesScreen}
              options={stackScreenFavoriteOptions(colorScheme)}
            />
            {/* TODO NOTE: when NotFound is active, hot reloading is broken and will always direct to this route */}
            {/* <Stack.Screen
              name="NotFound"
              component={NotFoundScreen}
              options={{ title: "Not Found" }}
            /> */}
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name="Modal"
                component={ModalScreen}
                options={stackScreenModalOptions(colorScheme)}
              />
            </Stack.Group>
          </Stack.Navigator>
        </KeyListenerContextProvider>
      </ProgressContextProvider>
    </PlayContextProvider>
  );
}
