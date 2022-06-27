import React, { FC, useEffect, useRef, useState } from "react";
import { Button, FlatList, View, StyleSheet, StatusBar } from "react-native";
import { Audio } from "expo-av";
import { Text } from "../Themed";

interface Props {
  title: string;
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   marginTop: StatusBar.currentHeight || 0,
  // },
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

export const ListItemButton: FC<Props> = ({ title }) => {
  const onToggle = () => {};
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Button onPress={onToggle} title="Play" />
    </View>
  );
};
