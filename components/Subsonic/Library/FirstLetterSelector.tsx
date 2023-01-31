import React, { FC, useContext } from "react";
import { Pressable, Text } from "react-native";
import { PlayContext } from "../../context/play-context";
import { View } from "../../Themed";
import { styles } from "./Library.styles";

export const FirstLetterSelector: FC = () => {
  const context = useContext(PlayContext);
  return (
    <View style={{ flexDirection: "row" }}>
      {context.libraryIndexes.map((indexItem) => {
        return (
          <Pressable
            key={indexItem.name}
            style={{ marginHorizontal: 10 }}
            onPress={async () => {
              context.setLibraryItems(indexItem?.artist ?? []);
              context.setLibraryBreadcrumb([{ name: indexItem.name }]);
            }}
          >
            <Text style={[styles.libraryItem]}>{indexItem.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};
