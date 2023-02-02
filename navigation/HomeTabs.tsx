import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions
} from "@react-navigation/material-top-tabs";
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

const options: MaterialTopTabNavigationOptions = {
  tabBarLabelStyle: {
    fontSize: 24,
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
      {/* TODO <Tab.Screen name="Favorites" component={LibraryScreen} /> */}
      <Tab.Screen options={options} name="Library" component={LibraryScreen} />
      <Tab.Screen options={options} name="Radio" component={RadioScreen} />
    </Tab.Navigator>
  );
}
