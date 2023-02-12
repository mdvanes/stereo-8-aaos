import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { IRadioSetting } from "../../getSettings";

export const SelectionStationButton: FC<{ setting: IRadioSetting }> = ({
  setting,
}) => (
  <Pressable
    onPress={() => {
      {
        /* TODO allow multiple radio stations */
      }
      alert("Not Yet Implemented");
    }}
    style={{
      margin: 20,
      paddingVertical: 20,
      paddingHorizontal: 50,
      flex: 1,
      backgroundColor: "#2196f3",
      borderRadius: 10,
    }}
  >
    <Text style={{ color: "white", fontSize: 28 }}>{setting.name}</Text>
  </Pressable>
);
