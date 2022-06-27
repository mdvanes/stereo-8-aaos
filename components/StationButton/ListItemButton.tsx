import React, { FC, useEffect, useRef, useState } from "react";
import { Button, FlatList, View, StyleSheet, StatusBar } from "react-native";
import { Audio } from "expo-av";
import { Text } from "../Themed";
import { styles } from "../item.styles";

interface Props {
  text: string;
  title: string;
  onClick: () => void;
}


export const ListItemButton: FC<Props> = ({ text, title, onClick }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.col} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
       {text}
      </Text>
      <Button
        onPress={onClick}
        title={title}
      />
    </View>
  );
};
