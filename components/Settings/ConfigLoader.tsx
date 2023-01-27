import md5 from "md5";
import React, { FC, useState } from "react";
import { ActivityIndicator, Button } from "react-native";
import { ISettings, ISettingsResponse } from "../../getSettings";
import { Text } from "../Themed";
import { formatConfig } from "./formatConfig";
import { getSalt } from "./getSalt";

interface ConfigLoaderProps {
  configUrl: string;
  configSettings: ISettings | undefined;
  setConfigSettings: (_: ISettings) => void;
  isBrowser: boolean;
}

export const ConfigLoader: FC<ConfigLoaderProps> = ({
  configUrl,
  configSettings,
  isBrowser,
  setConfigSettings,
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const readFromUrl = async (url: string) => {
    // NOTE: there is no CORS in native apps! https://reactnative.dev/docs/network#using-other-networking-libraries

    setError("");
    setIsLoading(true);
    try {
      const response: ISettingsResponse = await fetch(url).then((data) =>
        data.json()
      );

      const salt = getSalt();
      const saltedPassword = response?.subsonic?.password
        ? md5(`${response.subsonic.password}${salt}`)
        : undefined;

      setConfigSettings({
        ...response,
        subsonic: response.subsonic
          ? {
              domain: response.subsonic.domain,
              user: response.subsonic.user,
              salt,
              saltedPassword,
            }
          : undefined,
      });
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

  const configUrlByPlatform = isBrowser
    ? `http://localhost:9009/?get=https://${configUrl}`
    : `https://${configUrl}`;

  return (
    <>
      <Button
        title="Get config from URL"
        onPress={() => {
          readFromUrl(configUrlByPlatform);
        }}
      />

      {isLoading && (
        <ActivityIndicator size="large" style={{ height: 100, width: 100 }} />
      )}

      {Boolean(error) && <Text style={{ color: "red" }}>{error}</Text>}

      {!isLoading && <Text>Config: {formatConfig(configSettings)}</Text>}
    </>
  );
};
