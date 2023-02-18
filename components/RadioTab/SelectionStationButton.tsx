import React, { FC, useContext } from "react";
import { Pressable, Text } from "react-native";
import { TAB_TEXT_SIZE } from "../../constants/Layout";
import { IRadioSetting } from "../../getSettings";
import { PlayContext } from "../context/play-context";
import { useStationButton } from "../StationButton/useStationButton";

export const SelectionStationButton: FC<{ setting: IRadioSetting }> = ({
  setting,
}) => {
  const context = useContext(PlayContext);
  const { toggle } = useStationButton();

  return (
    <Pressable
      onPress={() => {
        if (setting) {
          context.setRadioSetting(setting);
          toggle(setting);
        }
      }}
      style={{
        marginVertical: 20,
        marginRight: 20,
        paddingVertical: 20,
        paddingHorizontal: 30,
        flex: 1,
        backgroundColor:
          context.radioSetting?.channelUrl === setting.channelUrl
            ? "#2196f3"
            : "#15456c",
        borderRadius: 10,
      }}
    >
      <Text
        style={{ color: "white", fontSize: TAB_TEXT_SIZE, textAlign: "center" }}
      >
        {setting.name}
      </Text>
    </Pressable>
  );
};
