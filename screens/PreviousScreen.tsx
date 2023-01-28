import React, { FC, useContext } from "react";
import { Text, View } from "react-native";
import { PlayContext } from "../components/context/play-context";

export const PreviousScreen: FC = () => {
  const context = useContext(PlayContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Text style={{ color: "white", fontSize: 24 }}>
        {context.previouslyPlayed}
      </Text>
    </View>
  );
};
