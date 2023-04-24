import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  SectionList,
  Text,
  View,
} from "react-native";
import { ISettings, getSettings } from "../../getSettings";
import { updateMeta } from "../StationButton/getMetadata";
import { PlayContext } from "../context/play-context";
import { styles } from "../item.styles";
import { SelectionStationButton } from "./SelectionStationButton";

// TODO React runtime error when navigating (multiple pages) in SectionList: https://github.com/necolas/react-native-web/issues/1769 -> might need upgrading to latest react-native, react 18 etc etc
export const RadioTab: FC = () => {
  const context = useContext(PlayContext);
  const [settings, setSettings] = useState<ISettings>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const run = async () => {
      const newSettings: ISettings = await getSettings();
      setSettings(newSettings);

      // Set default radio station if none selected
      if (
        !context.radioSetting &&
        newSettings.radio &&
        newSettings.radio.length > 0
      ) {
        context.setRadioSetting(newSettings.radio[0]);
      }
    };
    run();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    if (context.radioSetting) {
      await updateMeta({
        context,
        radioSetting: context.radioSetting,
      });
    }

    setRefreshing(false);
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
      <View style={{ flexDirection: "row", paddingLeft: 20, width: "100%" }}>
        {settings?.radio?.map((item) => (
          <SelectionStationButton key={item.name} setting={item} />
        ))}
      </View>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <SectionList
          sections={[{ title: "", data: context.previouslyPlayed ?? [] }]}
          keyExtractor={(item, index) => `${item.time}_${index}`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
