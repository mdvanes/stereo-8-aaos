import React, { useEffect, useRef, useState } from "react";
import { Button, FlatList, View, StyleSheet, StatusBar } from "react-native";
import { Audio } from "expo-av";
import { Text } from "../Themed";
import settings from "./settings.json";

const channelUrl = `https://icecast.omroep.nl/radio2-bb-mp3`;

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export const MyList = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      // backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

  const Item = ({ title }: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }: any) => <Item title={item.title} />;

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
