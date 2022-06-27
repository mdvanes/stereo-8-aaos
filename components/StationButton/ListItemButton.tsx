import React, { FC, useEffect, useRef, useState } from "react";
import {
  Button,
  FlatList,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import { Audio } from "expo-av";
import { Text } from "../Themed";
import { styles } from "../item.styles";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

interface Props {
  text: string;
  title: "play" | "pause";
  onClick: () => void;
}

export const ListItemButton: FC<Props> = ({ text, title, onClick }) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.item}>
      <Text
        style={styles.col}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        {text}
      </Text>
      <Pressable
        onPress={onClick}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <FontAwesome name={title} size={25} color={Colors[colorScheme].text} />
      </Pressable>
    </View>
  );
};
