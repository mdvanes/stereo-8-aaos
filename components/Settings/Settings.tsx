import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import appJson from "../../app.json";
import Layout from "../../constants/Layout";
import { ISettings } from "../../getSettings";
import { Text } from "../Themed";
import { ConfigLoader } from "./ConfigLoader";

const configUrlStoreKey = "@configUrl";
const configSettingsStoreKey = "@configSettings";
// const urlStoreKey = "@subsonicUrl";
// const userStoreKey = "@subsonicUser";
// const hashStoreKey = "@subsonicHash";

// TODO clean up file
const storeData = async (data: {
  configUrl: string;
  configSettings: ISettings | undefined;
  // subsonicUrl: string;
  // subsonicUser: string;
}) => {
  try {
    await AsyncStorage.setItem(configUrlStoreKey, data.configUrl);
    await AsyncStorage.setItem(
      configSettingsStoreKey,
      JSON.stringify(data.configSettings)
    );
    // await AsyncStorage.setItem(urlStoreKey, data.subsonicUrl);
    // await AsyncStorage.setItem(userStoreKey, data.subsonicUser);
    console.log("done");
  } catch (error) {
    // Error saving data
  }
};

export const getStoredData = async () => {
  const configUrl = await AsyncStorage.getItem(configUrlStoreKey);
  const response = await AsyncStorage.getItem(configSettingsStoreKey);
  try {
    const configSettings: ISettings = response ? JSON.parse(response) : "";
    return { configUrl, configSettings };
    // const subsonicUrl = await AsyncStorage.getItem(urlStoreKey);
    // const subsonicUser = await AsyncStorage.getItem(userStoreKey);
    // return { configUrl, configSettings, subsonicUrl, subsonicUser };
  } catch (e) {
    // error reading value
    throw Error("invalid json" + response);
  }
};

export default function Settings({ path }: { path: string }) {
  const [configUrl, onChangeConfigUrl] = useState("");
  // const [subsonicUrl, onChangeSubsonicUrl] = React.useState("");
  // const [subsonicUser, onChangeSubsonicUser] = React.useState("");
  // const [subsonicPassword, onChangeSubsonicPassword] = React.useState("");
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
        // if (data?.subsonicUrl) {
        //   onChangeSubsonicUrl(data.subsonicUrl);
        // }
        // if (data?.subsonicUser) {
        //   onChangeSubsonicUser(data.subsonicUser);
        // }
      } catch (err) {
        setError((err as Error).toString());
      }
    };
    run();
  }, []);

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <Text style={styles.label}>Config URL</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeConfigUrl}
        value={configUrl}
        placeholder="skip https://"
        placeholderTextColor="rgba(255,255,255,0.8)"
      />

      <ConfigLoader
        configUrl={configUrl}
        configSettings={configSettings}
        setConfigSettings={setConfigSettings}
      />

      {/* <Text style={styles.label}>Subsonic URL</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSubsonicUrl}
        value={subsonicUrl}
        placeholder="domain.com"
        placeholderTextColor="rgba(255,255,255,0.8)"
        />
        <Text style={styles.label}>Subsonic Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSubsonicUser}
        value={subsonicUser}
        placeholder="me"
        placeholderTextColor="rgba(255,255,255,0.8)"
      />
      <Text style={styles.label}>Subsonic Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSubsonicPassword}
        value={subsonicPassword}
        placeholder="secret"
        placeholderTextColor="rgba(255,255,255,0.8)"
        secureTextEntry
      /> */}
      <Button
        title="save"
        onPress={async () => {
          try {
            await storeData({
              configUrl,
              configSettings,
              // subsonicUrl,
              // subsonicUser,
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

      <Text style={{ marginTop: 32, fontSize: 28 }}>
        v{appJson.expo.version}
      </Text>

      <Text>
        {Math.round(Dimensions.get("window").width)} x{" "}
        {Math.round(Dimensions.get("window").height)} (
        {Layout.isBigDevice ? "big" : "small"})
      </Text>

      {__DEV__ && (
        <Text
          style={{
            borderColor: "green",
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
          }}
        >
          !IN DEV MODE!
        </Text>
      )}
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
