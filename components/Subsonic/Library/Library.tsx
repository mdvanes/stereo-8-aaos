import React, { FC, useContext, useEffect } from "react";
import { SafeAreaView, SectionList } from "react-native";
import { PlayContext } from "../../context/play-context";
import { getIndexes } from "../getSubsonic";
import { Breadcrumb } from "./Breadcrumb";
import { FirstLetterSelector } from "./FirstLetterSelector";
import { LibraryItem } from "./LibraryItem";

export const Library: FC = () => {
  const context = useContext(PlayContext);

  const init = async () => {
    const r = await getIndexes();
    context.setLibraryIndexes(r);
    context.setLibraryItems(r.find((n) => n.name === "A")?.artist ?? []);
  };

  useEffect(() => {
    const run = async () => {
      init();
    };

    run();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <SectionList
        sections={[{ title: "", data: context.libraryItems }]}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => (
          <LibraryItem
            item={item}
            items={context.libraryItems}
            isActive={context.song?.id === item.id}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <>
            {context.libraryBreadcrumb.length > 0 && <Breadcrumb />}
            {context.libraryBreadcrumb.length === 0 && <FirstLetterSelector />}
          </>
        )}
      />
    </SafeAreaView>
  );
};
