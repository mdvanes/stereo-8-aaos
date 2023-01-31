import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ColorSchemeName } from "react-native";
import { PlayContextProvider } from "../components/context/play-context";
import { ProgressContextProvider } from "../components/context/progress-context";
import { SoundWrapper } from "../components/SoundWrapper/SoundWrapper";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import { RootStackParamList } from "../types";
import { HomeTabs } from "./HomeTabs";
import LinkingConfiguration from "./LinkingConfiguration";
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
      </ProgressContextProvider>
    </PlayContextProvider>
  );
}
