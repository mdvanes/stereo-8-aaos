import { FontAwesome } from "@expo/vector-icons";
import React, { FC, useContext } from "react";
import { Pressable, Text } from "react-native";
import { PlayContext } from "../../context/play-context";
import { View } from "../../Themed";
import { getLabel } from "./getLabel";
import { styles } from "./Library.styles";

export const Breadcrumb: FC = () => {
  const context = useContext(PlayContext);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={[styles.libraryItem]}>
        <Pressable
          onPress={async () => {
            const firstIndex = context.libraryIndexes[0];
            if (firstIndex) {
              context.setLibraryItems(firstIndex.artist ?? []);
              context.setLibraryBreadcrumb([]);
            }
          }}
        >
          <Text style={[styles.libraryItem]}>Library</Text>
        </Pressable>{" "}
      </Text>

      {context.libraryBreadcrumb.map((item, index) => (
        <View
          key={`${item.id}_${index}`}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome
            name="caret-right"
            size={20}
            style={{ marginHorizontal: 15, color: "white" }}
          />
          <Text style={styles.libraryItem}>{getLabel(item)}</Text>
        </View>
      ))}
    </View>
  );
};
