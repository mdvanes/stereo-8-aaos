import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { LibraryScreen } from "../screens/LibraryScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import { RadioScreen } from "../screens/RadioScreen";

type HomeTabsParamList = {
  Playlists: undefined;
  Radio: undefined;
  Favorites: undefined;
  Library: undefined;
};

const Tab = createMaterialTopTabNavigator<HomeTabsParamList>();

export function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="Playlists">
      <Tab.Screen name="Playlists" component={PlaylistsScreen} />
      <Tab.Screen name="Radio" component={RadioScreen} />
      {/* TODO <Tab.Screen name="Favorites" component={LibraryScreen} /> */}
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
}
