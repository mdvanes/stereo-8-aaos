import React, { FC, useState } from "react";
import { ActivityIndicator, Button, Pressable, View } from "react-native";
import { ISettings } from "../../getSettings";
import { Text } from "../Themed";

const formatConfig = (configSettings: ISettings | undefined) => {
  if (!configSettings) {
    return "";
  }
  return `
Subsonic URL: ${configSettings.subsonic?.domain}
Subsonic user: ${configSettings.subsonic?.user}
Subsonic password: ${configSettings.subsonic?.password ? "***" : ""}
   `;
};

// TODO clean up file
export const ConfigLoader: FC<{
  configUrl: string;
  configSettings: ISettings | undefined;
  setConfigSettings: (_: ISettings) => void;
}> = ({ configUrl, configSettings, setConfigSettings }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const readFromUrl = async (url: string) => {
    // NOTE: there is no CORS in native apps! https://reactnative.dev/docs/network#using-other-networking-libraries

    setIsLoading(true);
    try {
      const response: ISettings = await fetch(url).then((data) => data.json());
      setConfigSettings(response);
    } catch (err) {
      setError("Err " + (err as Error).toString());
    }
    setIsLoading(false);
  };

  // NOTE: This works on Browser, not on Android
  // import * as WebBrowser from "expo-web-browser";
  // const handleHelpPress = () => {
  //   WebBrowser.openBrowserAsync(
  //     "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  //   );
  // };

  return (
    <>
      <Button
        title="Get config from URL"
        onPress={() => {
          readFromUrl(`https://${configUrl}`);
        }}
      />
      {/* <View style={{ flexDirection: "row" }}>
        <Pressable
          onPress={() => {
            readFromUrl(`http://localhost:3000/?get=https://${configUrl}`);
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            marginHorizontal: 20,
          })}
        >
          <Text style={{ fontSize: 24 }}>Web</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            readFromUrl(`https://${configUrl}`);
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            marginHorizontal: 20,
          })}
        >
          <Text style={{ fontSize: 24 }}>Load</Text>
        </Pressable>
      </View> */}
      <Pressable
        onPress={() => {
          readFromUrl(`http://localhost:3000/?get=https://${configUrl}`);
        }}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
          marginHorizontal: 20,
        })}
      >
        <Text style={{ fontSize: 24 }}>Web</Text>
      </Pressable>

      {isLoading && (
        <ActivityIndicator size="large" style={{ height: 100, width: 100 }} />
      )}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      {!isLoading && <Text>Config: {formatConfig(configSettings)}</Text>}
    </>
  );
};
