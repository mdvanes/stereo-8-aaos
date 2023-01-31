import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Pressable, SafeAreaView, Text, View } from "react-native";
import { BottomBar } from "../components/BottomBar/BottomBar";
import { ConditionalImageBackground } from "../components/ConditionalImageBackground";
import { PlayContext } from "../components/context/play-context";
import { getSettings, ISettings } from "../getSettings";

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
          <View style={{ flexDirection: "row" }}>
            {settings?.radio?.map(({ name }) => (
              <Pressable
                key={name}
                style={{
                  margin: 20,
                  padding: 20,
                  flex: 1,
                  backgroundColor: "#2196f3",
                  borderRadius: 10,
                }}
              >
                {/* TODO onClick -> allow multiple stations */}
                <Text style={{ color: "white", fontSize: 28 }}>{name}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={{ color: "white", fontSize: 24 }}>
            {context.previouslyPlayed}
          </Text>
        </ConditionalImageBackground>
      </SafeAreaView>

      <BottomBar />
    </View>
  );
};
