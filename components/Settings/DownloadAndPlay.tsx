import { FC } from "react";
import { Button } from "react-native";
import { getAPI } from "../Subsonic/getSubsonic"; // TODO introduces cycle: getSubsonic -> getSettings -> getStoredData from Settings -> this file -> getSubsonic
// import { RNFetchBlob } from "rn-fetch-blob";
import { Text, View } from "../Themed";
import ReactNativeBlobUtil from 'react-native-blob-util'

// import {NativeModules} from 'react-native';
// const RNFetchBlob = NativeModules.RNFetchBlob

const foo = () => {
  const songId = "2921"; // Crush
  const url = getAPI("download", `&id=${songId}`);
  console.log(url, ReactNativeBlobUtil);

  // TODO note: this file is not removed automatically
  ReactNativeBlobUtil.config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache: true,
  })
    .fetch("GET", url, {
      //some headers ..
    })
    .then((res) => {
      // the temp file path
      // TODO this does not work on web, but does in emulator:  LOG  The file saved to  /data/user/0/com.mdworld.stereo8aaos/files/ReactNativeBlobUtilTmp_1s8cpc443pcdzv3yvzy1o
      const p = res.path();
      const msg = `The file saved to: ${p}`;
      console.log(msg);
      alert(msg);
    });
};

export const DownloadAndPlay: FC = () => {
  return (
    <View>
      <Text>Download and play</Text>
      <Button
        title="test"
        onPress={() => {
          foo();
        }}
      />
    </View>
  );
};
