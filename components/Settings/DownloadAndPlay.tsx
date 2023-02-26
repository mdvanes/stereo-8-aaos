import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createDownloadResumable,
  documentDirectory,
  getInfoAsync,
} from "expo-file-system";
import { FC, useContext, useState } from "react";
import { ActivityIndicator, Button } from "react-native";
// import ReactNativeBlobUtil from "react-native-blob-util";
import { PlayContext, PlayValues } from "../context/play-context";
import { getAPI } from "../Subsonic/getSubsonic";
import { Text, View } from "../Themed";

const downloadDemoAndPlay10Sec = async (
  context: PlayValues,
  setProgress: (_: number) => void
) => {
  setProgress(1);
  const songId = "2921"; // Crush

  const url = getAPI("download", `&id=${songId}`);
  console.log("downloadurl:", url);

  const downloadResumable = createDownloadResumable(
    url,
    documentDirectory + `subsonic_${songId}.mp3`,
    {},
    (downloadProgress) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      console.log("progress:", progress, downloadProgress);
    }
  );

  try {
    const downloadResult = await downloadResumable.downloadAsync();
    console.log("Finished downloading to ", downloadResult);
    setProgress(-1);

    const uri = downloadResult?.uri;

    if (uri) {
      await AsyncStorage.setItem("@download", uri);
      const info = await getInfoAsync(downloadResult.uri);
      console.log("fileinfo:", info);

      if (context.pbo) {
        await context.pbo.pauseAsync();
        await context.pbo.unloadAsync();
        await context.pbo.loadAsync({
          uri,
        });
        await context.pbo.playAsync();

        setTimeout(async () => {
          console.log("stopping playing download");
          if (context.pbo) {
            await context.pbo.pauseAsync();
            await context.pbo.unloadAsync();
            console.log("stopped playing download");
          }
        }, 10000);
      }
    }
  } catch (e) {
    console.error("pbo error:", e);
  }
};

export const DownloadAndPlay: FC = () => {
  const context = useContext(PlayContext);
  const [progress, setProgress] = useState(-1);

  return (
    <View>
      <Text>Download and play</Text>
      {progress > -1 && <ActivityIndicator />}
      <Button
        title="test"
        onPress={() => {
          downloadDemoAndPlay10Sec(context, setProgress);
        }}
      />
    </View>
  );
};
