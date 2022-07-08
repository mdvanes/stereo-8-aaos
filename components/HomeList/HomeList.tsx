import React from "react";
// import { FlatList } from "react-native";
import { StationButton } from "../StationButton/StationButton";
import { SubsonicButton } from "../SubsonicButton/SubsonicButton";

// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//   },
// ];
// const renderItem = ({ item }: any) => <ListItemButton title={item.title} />;
import { Text } from "../Themed";

export const HomeList = () => {
  return (
    <>
      {/* <Text lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
        without FlatList
      </Text> */}
      {/* <StationButton channelName="NPO Radio 2" channelURL="https://icecast.omroep.nl/radio2-bb-mp3" /> */}
      <SubsonicButton />
      {/* <FlatList
        style={{ minWidth: "40vw" }}
        //   data={DATA}
        //   renderItem={renderItem}
        data={[
          // { id: "1", type: "elem", elem: <StationButton /> },
          // { id: "2", type: "elem", elem: <SubsonicButton /> },
        ]}
        renderItem={({
          item,
        }: {
          item: { id: string; type: string; elem: JSX.Element };
        }) => item.elem}
        keyExtractor={(item) => item.id}
      /> */}
    </>
  );
};
