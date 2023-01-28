import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { FC } from "react";
import { Text, View } from "react-native";
import { LibraryScreen } from "../screens/LibraryScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import { PreviousScreen } from "../screens/PreviousScreen";

type HomeTabsParamList = {
  Playlists: undefined;
  Previous: undefined;
  Favorites: undefined;
  Library: undefined;
};

const Tab = createMaterialTopTabNavigator<HomeTabsParamList>();

export function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="Previous">
      <Tab.Screen name="Playlists" component={PlaylistsScreen} />
      <Tab.Screen name="Previous" component={PreviousScreen} />
      <Tab.Screen name="Favorites" component={LibraryScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
}
