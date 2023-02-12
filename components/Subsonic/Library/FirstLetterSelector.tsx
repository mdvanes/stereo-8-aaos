import React, { FC, useContext } from "react";
import { Pressable, Text } from "react-native";
import { PlayContext } from "../../context/play-context";
import { View } from "../../Themed";
import { styles } from "./Library.styles";

export const FirstLetterSelector: FC = () => {
  const context = useContext(PlayContext);
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 10,
        backgroundColor: "transparent",
      }}
    >
      {context.libraryIndexes.map((indexItem) => {
        return (
          <Pressable
            key={indexItem.name}
            style={{ padding: 20 }}
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
