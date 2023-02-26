import {
  createDownloadResumable,
  documentDirectory,
  getInfoAsync,
} from "expo-file-system";
import { FC, useContext, useState } from "react";
import { ActivityIndicator, Button } from "react-native";
import ReactNativeBlobUtil from "react-native-blob-util";
import { PlayContext, PlayValues } from "../context/play-context";
import { getAPI } from "../Subsonic/getSubsonic";
import { Text, View } from "../Themed";

// const soundLocation = "./mysounds";

const foo = async (context: PlayValues) => {
  const songId = "2921"; // Crush
  const url = getAPI("download", `&id=${songId}`);
  console.log(url, ReactNativeBlobUtil);

  // TODO note: this file is not removed automatically
  const res = await ReactNativeBlobUtil.config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache: true,
    appendExt: "mp3",
    // path: soundLocation,
  })
    .fetch("GET", url, {
      //some headers ..
    })
    .catch((err) => {
      console.log("error:", err);
    });

  // try {
  //   // the temp file path
  //   // TODO this does not work on web, but does in emulator:  LOG  The file saved to  /data/user/0/com.mdworld.stereo8aaos/files/ReactNativeBlobUtilTmp_1s8cpc443pcdzv3yvzy1o
  //   const p = res.path();
  //   const msg = `The file saved to: ${p}`;
  //   // TODO not enough for test: try to play to PBO
  //   console.log(msg);
  //   alert(msg);

  //   if (context.pbo) {
  //     console.log(p);
  //     // const x = require(p);
  //     const x1 =
  //       "file:///data/user/0/com.mdworld.stereo8aaos/files/ReactNativeBlobUtilTmp_1j6wjwtykmb5tnnfbi7vj4.mp3";
  //     await context.pbo.pauseAsync();
  //     await context.pbo.unloadAsync();
  //     await context.pbo.loadAsync({
  //       uri: p,
  //       // uri: require(x1),
  //     });
  //     await context.pbo.playAsync();

  //     setTimeout(async () => {
  //       if (context.pbo) {
  //         await context.pbo.pauseAsync();
  //         await context.pbo.unloadAsync();
  //       }
  //     }, 10000);
  //   }
  // } catch (err) {
  //   console.log(err);
  // }

  // const { sound } = await Audio.Sound.createAsync(require(p));
  // await sound.playAsync();
  // setTimeout(() => {
  //   sound.unloadAsync();
  // }, 10000);
};

const bar = async (context: PlayValues, setProgress: (_: number) => void) => {
  setProgress(1);
  const songId = "2921"; // Crush
  // const songId = "3002"; // TNGHT

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
    const x = await downloadResumable.downloadAsync();
    console.log("Finished downloading to ", x);
    setProgress(-1);

    const uri = x?.uri;

    if (uri) {
      const info = await getInfoAsync(x.uri);
      console.log("fileinfo:", info);

      // const curi = await getContentUriAsync(x.uri);
      // console.log("curi", curi);

      // const xAsset = new Asset();

      if (context.pbo) {
        await context.pbo.pauseAsync();
        await context.pbo.unloadAsync();
        await context.pbo.loadAsync(
          {
            uri,
          }
          // x
          //   {
          //   // uri: curi,
          //   // uri: require(x1),
          // }
        );
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
          // foo(context);
          bar(context, setProgress);
        }}
      />
    </View>
  );
};
