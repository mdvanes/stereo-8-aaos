import React from "react";
import { FlatList } from "react-native";
import { SubsonicButton } from "../StationButton/getSubsonic";
import { StationButton } from "../StationButton/StationButton";

// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item",
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third Item",
//   },
// ];

// const renderItem = ({ item }: any) => <ListItemButton title={item.title} />;

export const HomeList = () => {
  return (
    <FlatList
      style={{ minWidth: "40vw" }}
      //   data={DATA}
      //   renderItem={renderItem}
      data={[
        { id: "1", type: "elem", elem: <StationButton /> },
        { id: "2", type: "elem", elem: <SubsonicButton /> },
      ]}
      renderItem={({
        item,
      }: {
        item: { id: string; type: string; elem: JSX.Element };
      }) => item.elem}
      keyExtractor={(item) => item.id}
    />
  );
};