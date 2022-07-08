import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function EditScreenInfo({ path }: { path: string }) {
  const [subsonicUrl, onChangeSubsonicUrl] = React.useState("");
  const [subsonicUser, onChangeSubsonicUser] = React.useState("");
  // const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSubsonicUrl}
        value={subsonicUrl}
        placeholder="Subsonic URL"
        // lightColor="rgba(0,0,0,0.8)"
        // darkColor="rgba(255,255,255,0.8)"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeSubsonicUser}
        value={subsonicUser}
        placeholder="Subsonic User"
      />
      {/* <TextInput
        // style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        // keyboardType="numeric"
      /> */}
    </SafeAreaView>
    // <View>
    //   <View style={styles.getStartedContainer}>
    //     <Text
    //       style={styles.getStartedText}
    //       lightColor="rgba(0,0,0,0.8)"
    //       darkColor="rgba(255,255,255,0.8)"
    //     >
    //       Subsonic https: xxx
    //       {/* <br/> */}
    //       Subsonic username: xxx
    //       {/* <br/> */}
    //       Subsonic pw: xxx
    //       {/* <br/> */}
    //     </Text>
    //     <Text
    //       style={styles.getStartedText}
    //       lightColor="rgba(0,0,0,0.8)"
    //       darkColor="rgba(255,255,255,0.8)"
    //     >
    //       Open up the code for this screen:
    //     </Text>

    //     <View
    //       style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
    //       darkColor="rgba(255,255,255,0.05)"
    //       lightColor="rgba(0,0,0,0.05)"
    //     >
    //       <MonoText>{path}</MonoText>
    //     </View>

    //     <Text
    //       style={styles.getStartedText}
    //       lightColor="rgba(0,0,0,0.8)"
    //       darkColor="rgba(255,255,255,0.8)"
    //     >
    //       Change any of the text, save the file, and your app will automatically
    //       update.
    //     </Text>
    //   </View>

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
  input: {
    borderColor: "white",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
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
