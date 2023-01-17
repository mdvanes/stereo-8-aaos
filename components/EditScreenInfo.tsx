import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appJson from '../app.json';

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

export default function EditScreenInfo({ path }: { path: string }) {
  const [subsonicUrl, onChangeSubsonicUrl] = React.useState("");
  const [subsonicUser, onChangeSubsonicUser] = React.useState("");
  // TODO don't store plaintext password, but salted
  const [subsonicPassword, onChangeSubsonicPassword] = React.useState("");
  const [saved, setSaved] = React.useState(false);
  // const [number, onChangeNumber] = React.useState(null);

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
    <SafeAreaView>
      <Text style={styles.label}>Subsonic URL</Text>
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
      />
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
      <Text style={{ marginTop: 32, fontSize: 28 }}>v{appJson.expo.version}</Text>
      {saved && <Text>Saved!</Text>}
      {/* <TextInput
        // style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        // keyboardType="numeric"
      /> */}
    </SafeAreaView>
    // <View>
    //   <View style={styles.helpContainer}>
    //     <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
    //       <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
    //         Tap here if your app doesn't automatically update after making
    //         changes
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
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
