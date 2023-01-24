import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput } from "react-native";
import appJson from "../../app.json";
import { TestFs } from "../TestFs/TestFs";
import { Text } from "../Themed";

const urlStoreKey = "@subsonicUrl";
const userStoreKey = "@subsonicUser";
const hashStoreKey = "@subsonicHash";

const storeData = async (data: {
  subsonicUrl: string;
  subsonicUser: string;
}) => {
  try {
    await AsyncStorage.setItem(urlStoreKey, data.subsonicUrl);
    await AsyncStorage.setItem(userStoreKey, data.subsonicUser);
    console.log("done");
  } catch (error) {
    // Error saving data
  }
};

const getData = async () => {
  try {
    // TODO do not retrieve hash here
    const subsonicUrl = await AsyncStorage.getItem(urlStoreKey);
    const subsonicUser = await AsyncStorage.getItem(userStoreKey);
    return { subsonicUrl, subsonicUser };
  } catch (e) {
    // error reading value
  }
};

// TODO rename to Settings
export default function Settings({ path }: { path: string }) {
  const [subsonicUrl, onChangeSubsonicUrl] = React.useState("");
  const [subsonicUser, onChangeSubsonicUser] = React.useState("");
  // TODO don't store plaintext password, but salted
  const [subsonicPassword, onChangeSubsonicPassword] = React.useState("");
  const [saved, setSaved] = React.useState(false);

  useEffect(() => {
    getData().then((data) => {
      if (data?.subsonicUrl) {
        onChangeSubsonicUrl(data.subsonicUrl);
      }
      if (data?.subsonicUser) {
        onChangeSubsonicUser(data.subsonicUser);
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <Text style={styles.label}>Subsonic URL</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSubsonicUrl}
        value={subsonicUrl}
        placeholder="domain.com"
        placeholderTextColor="rgba(255,255,255,0.8)"
      />
      {/* TODO restore: <Text style={styles.label}>Subsonic Username</Text>
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
            await storeData({ subsonicUrl, subsonicUser });
            setSaved(true);
            setTimeout(() => {
              setSaved(false);
            }, 1000);
          } catch (err) {}
        }}
      />
      <Text style={{ marginTop: 32, fontSize: 28 }}>
        v{appJson.expo.version}
      </Text>
      {saved && <Text>Saved!</Text>}
      <TestFs />
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
