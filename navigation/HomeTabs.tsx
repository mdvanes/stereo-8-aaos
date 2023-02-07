import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import React from "react";
import { TAB_TEXT_SIZE } from "../constants/Layout";
import { FavoritesScreen } from "../screens/FavoritesScreen";
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

const options: MaterialTopTabNavigationOptions = {
  tabBarLabelStyle: {
    fontSize: TAB_TEXT_SIZE,
  },
};

export function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="Playlists">
      <Tab.Screen
        options={options}
        name="Playlists"
        component={PlaylistsScreen}
      />
      <Tab.Screen
        options={options}
        name="Favorites"
        component={FavoritesScreen}
      />
      <Tab.Screen options={options} name="Library" component={LibraryScreen} />
      <Tab.Screen options={options} name="Radio" component={RadioScreen} />
    </Tab.Navigator>
  );
}
