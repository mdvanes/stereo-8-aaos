import React, { FC, useContext, useEffect, useState } from "react";
import { SafeAreaView, SectionList, Text, View } from "react-native";
import { getSettings, ISettings } from "../../getSettings";
import { PlayContext } from "../context/play-context";
import { styles } from "../item.styles";
import { SelectionStationButton } from "./SelectionStationButton";

export const RadioTab: FC = () => {
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
      <View style={{ flexDirection: "row" }}>
        {settings?.radio?.map((item) => (
          <SelectionStationButton key={item.name} setting={item} />
        ))}
      </View>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
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
        />
      </SafeAreaView>
    </View>
  );
};
