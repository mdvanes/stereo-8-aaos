/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Image, View, Text } from "react-native";
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
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

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
            options={({ navigation }: RootStackScreenProps<"Playlists">) => ({
              title: "Stereo 8 by mdworld.nl",
              headerLeft: () => (
                <Image
                  style={styles.logo}
                  source={require("../assets/images/icon.png")}
                />
              ),
              headerRight: () => (
                <Pressable
                  onPress={() => navigation.navigate("Modal")}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <FontAwesome
                    name="cog"
                    size={25}
                    color={Colors[colorScheme].text}
                    style={{ marginRight: 15 }}
                  />
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name="Playlist"
            component={PlaylistScreen}
            options={({ navigation }: RootStackScreenProps<"Playlist">) => ({
              headerTitle: () => <PlaylistTitle />,
              // headerLeft: () => (
              //   <Pressable
              //     onPress={() => navigation.navigate("Playlists")}
              //     style={({ pressed }) => ({
              //       opacity: pressed ? 0.5 : 1,
              //       padding: 15,
              //     })}
              //   >
              //     <FontAwesome
              //       name="arrow-left"
              //       size={25}
              //       color={Colors[colorScheme].text}
              //       style={{ marginRight: 15 }}
              //     />
              //   </Pressable>
              // ),
              headerRight: () => (
                <Pressable
                  onPress={() => navigation.navigate("Modal")}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <FontAwesome
                    name="cog"
                    size={25}
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
            options={{ title: "Settings" }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </PlayContextProvider>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="play" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="cog"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
