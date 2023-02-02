import React, { FC, useContext, useEffect, useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  SectionList,
  Text,
  View,
} from "react-native";
import { BottomBar } from "../components/BottomBar/BottomBar";
import { ConditionalImageBackground } from "../components/ConditionalImageBackground";
import { PlayContext } from "../components/context/play-context";
import { getSettings, IRadioSetting, ISettings } from "../getSettings";
import { styles } from "../components/item.styles";

const SelectionStationButton: FC<{ setting: IRadioSetting }> = ({
  setting,
}) => (
  <Pressable
    key={setting.name}
    onPress={() => {
      {
        /* TODO allow multiple radio stations */
      }
      alert("Not Yet Implemented");
    }}
    style={{
      margin: 20,
      padding: 20,
      flex: 1,
      backgroundColor: "#2196f3",
      borderRadius: 10,
    }}
  >
    <Text style={{ color: "white", fontSize: 28 }}>{setting.name}</Text>
  </Pressable>
);

export const RadioScreen: FC = () => {
  const context = useContext(PlayContext);
  const [settings, setSettings] = useState<ISettings>();

  useEffect(() => {
    const run = async () => {
      const newSettings: ISettings = await getSettings();
      setSettings(newSettings);
    };
    run();
  }, []);

  return (
    <View
      style={{
        alignItems: "flex-start",
        flex: 1,
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <ConditionalImageBackground img={context.song?.img}>
          <SectionList
            sections={[{ title: "", data: context.previouslyPlayed ?? [] }]}
            keyExtractor={(item, index) => `${item.time}_${index}`}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={[styles.line, { color: "white" }]}>
                  {item.time} {item.artist} - {item.title}
                </Text>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  {settings?.radio?.map((item) => (
                    <SelectionStationButton setting={item} />
                  ))}
                </View>
              );
            }}
          />
        </ConditionalImageBackground>
      </SafeAreaView>
      <BottomBar />
    </View>
  );
};
