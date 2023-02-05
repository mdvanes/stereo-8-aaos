import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import appJson from "../../app.json";
import Colors from "../../constants/Colors";
import Layout, { HEADER_ICON_SIZE } from "../../constants/Layout";
import { ISettings } from "../../getSettings";
import { ReloadContext } from "../context/reload-context";
import { Text } from "../Themed";
import { ConfigLoader } from "./ConfigLoader";
import { ReloadButton } from "./ReloadButton";

const configUrlStoreKey = "@configUrl";
const configSettingsStoreKey = "@configSettings";

const storeData = async (data: {
  configUrl: string;
  configSettings: ISettings | undefined;
}) => {
  try {
    await AsyncStorage.setItem(configUrlStoreKey, data.configUrl);
    await AsyncStorage.setItem(
      configSettingsStoreKey,
      JSON.stringify(data.configSettings)
    );
    console.log("done");
  } catch (error) {
    alert("Error saving data");
  }
};

export const getStoredData = async () => {
  const configUrl = await AsyncStorage.getItem(configUrlStoreKey);
  const response = await AsyncStorage.getItem(configSettingsStoreKey);
  try {
    const configSettings: ISettings = response ? JSON.parse(response) : "";
    return { configUrl, configSettings };
  } catch (e) {
    throw Error("invalid json" + response);
  }
};

export default function Settings({ path }: { path: string }) {
  const [configUrl, onChangeConfigUrl] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [configSettings, setConfigSettings] = useState<ISettings>();

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getStoredData();
        console.log(data);
        if (data?.configUrl) {
          onChangeConfigUrl(data.configUrl);
        }
        if (data?.configSettings) {
          setConfigSettings(data.configSettings);
        }
      } catch (err) {
        setError((err as Error).toString());
      }
    };
    run();
  }, []);

  // @ts-expect-error userAgentData is very new
  const isBrowser = window.navigator?.userAgentData?.brands.some(
    (b: { brand: string }) => b.brand === "Google Chrome"
  );

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <Text style={styles.label}>Config URL</Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <Text style={{ fontSize: 18 }}>https://</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeConfigUrl}
          value={configUrl}
          placeholder="skip https://"
          placeholderTextColor="rgba(255,255,255,0.8)"
        />
      </View>

      <ConfigLoader
        configUrl={configUrl}
        configSettings={configSettings}
        isBrowser={isBrowser}
        setConfigSettings={setConfigSettings}
      />

      <Button
        title="save"
        onPress={async () => {
          try {
            await storeData({
              configUrl,
              configSettings,
            });
            setSaved(true);
            setTimeout(() => {
              setSaved(false);
            }, 1000);
          } catch (err) {}
        }}
      />

      {Boolean(saved) && <Text>Saved!</Text>}
      {Boolean(error) && <Text>{error}</Text>}

      <View style={{ flexDirection: "row", marginTop: 32 }}>
        <View>
          <Text style={{ fontSize: 28 }}>v{appJson.expo.version}</Text>
          <Text>
            {Math.round(Dimensions.get("window").width)} x{" "}
            {Math.round(Dimensions.get("window").height)} (
            {Layout.isBigDevice ? "big" : "small"})
          </Text>
        </View>

        <View style={{ flexDirection: "row", height: 38, marginLeft: 30 }}>
          {__DEV__ && (
            <Text
              style={{
                backgroundColor: "green",
                color: "white",
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginRight: 20,
                fontWeight: "bold",
              }}
            >
              DEV MODE
            </Text>
          )}

          <Text
            style={{
              backgroundColor: isBrowser ? "green" : "#2196f3",
              color: "white",
              paddingVertical: 10,
              paddingHorizontal: 20,
              fontWeight: "bold",
            }}
          >
            {Boolean(isBrowser) ? "BROWSER" : "APP"} MODE
          </Text>
        </View>
      </View>

      <ReloadButton />

      <View style={{ flexDirection: "row" }}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 22,
  },
  input: {
    borderColor: "rgba(255,255,255,0.8)",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "rgba(255,255,255,0.8)",
    fontSize: 18,
    flex: 1,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
