import React, { FC, useContext } from "react";
import { Pressable, Text } from "react-native";
import { IRadioSetting } from "../../getSettings";
import { PlayContext } from "../context/play-context";

export const SelectionStationButton: FC<{ setting: IRadioSetting }> = ({
  setting,
}) => {
  const context = useContext(PlayContext);

  return (
    <Pressable
      onPress={() => {
        context.setRadioSetting(setting);
      }}
      style={{
        marginVertical: 20,
        marginRight: 20,
        paddingVertical: 20,
        paddingHorizontal: 30,
        flex: 1,
        backgroundColor: "#2196f3",
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
        {setting.name}
      </Text>
    </Pressable>
  );
};
