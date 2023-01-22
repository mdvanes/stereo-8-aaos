import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
// import RNFS from "react-native-fs";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Text } from "../Themed";

const RNFSManager = require("react-native").NativeModules.RNFSManager;

export const TestFs = () => {
  const [externalDirectory, setExternalDirectory] = useState("");
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState();

  //   const colorScheme = useColorScheme();

  //   const x = RNFSManager;

  //   useEffect(() => {
  //     //get user's file paths from react-native-fs
  //     // setDownloadsFolder(RNFS.DownloadDirectoryPath);
  //     // setDocumentsFolder(RNFS.DocumentDirectoryPath); //alternative to MainBundleDirectory.
  //   }, []);

  const onToggle = () => {
    if (RNFSManager) {
      const RNFS = require("react-native-fs");
      setExternalDirectory(RNFS.ExternalStorageDirectoryPath);

      const getFileContent = async (path: string) => {
        const reader = await RNFS.readDir(path);
        setFiles(reader);
      };

      getFileContent(RNFS.ExternalStorageDirectoryPath);
    } else {
      setExternalDirectory("NO RNFS");
    }
  };

  const readFile = async () => {
    if (RNFSManager) {
      const RNFS = require("react-native-fs");
      const filePath = RNFS.DocumentDirectoryPath + "/stereo8config.json";
      const response = await RNFS.readFile(filePath);
      setFileData(response); //set the value of response to the fileData Hook.
    } else {
      setFileData("NO RNFS");
    }
  };

  //this component will render our list item to the UI
  const Item = ({ name, isFile }: any) => {
    return (
      <View>
        <Text>Name: {name}</Text>
        <Text> {isFile ? "It is a file" : "It's a folder"}</Text>
      </View>
    );
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View>
        <Text>{index}</Text>
        {/* The isFile method indicates whether the scanned content is a file or a folder*/}
        <Item name={item.name} isFile={item.isFile()} />
      </View>
    );
  };

  return (
    <>
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Text style={{ fontSize: 36 }}>Test FS</Text>
      </Pressable>
      <Text>External storage: {externalDirectory}</Text>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.name}
      />
      <Pressable
        onPress={() => {
          readFile();
        }}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Text style={{ fontSize: 36 }}>Load Config</Text>
      </Pressable>
      <Text>{fileData}</Text>
    </>
  );
};
