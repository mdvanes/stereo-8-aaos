import React, { FC, useContext, useEffect } from "react";
import { SafeAreaView, SectionList } from "react-native";
import { ConditionalImageBackground } from "../../ConditionalImageBackground";
import { PlayContext } from "../../context/play-context";
import { getIndexes } from "../getSubsonic";
import { Breadcrumb } from "./Breadcrumb";
import { FirstLetterSelector } from "./FirstLetterSelector";
import { LibraryItem } from "./LibraryItem";

// TODO clean up comments or implement
export const Library: FC = () => {
  const context = useContext(PlayContext);

  const init = async () => {
    // setIsLoading(true);
    // context.setLibraryItems(await getIndexes());
    const r = await getIndexes();
    context.setLibraryIndexes(r);
    context.setLibraryItems(r.find((n) => n.name === "A")?.artist ?? []);
    // const x = context.libraryIndexes[0];
    // if (r && r.length > 0) {
    //   context.setLibraryItems(r[0].artist ?? []);
    //   context.setLibraryBreadcrumb([{ name: r[0].name }]);
    // }
    // setIsLoading(false);
  };

  useEffect(() => {
    // if (!hasValidSettings()) {
    //   setError("Settings not complete");
    //   return;
    // }

    const run = async () => {
      // try {
      //   await testConnection();
      // } catch (err) {
      //   setError("Settings invalid");
      //   return;
      // }
      init();
    };

    run();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <ConditionalImageBackground img={context.song?.img}>
        <SectionList
          sections={[{ title: "", data: context.libraryItems }]}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          renderItem={({ item }) => (
            <LibraryItem item={item} items={context.libraryItems} isActive={context.song?.id === item.id} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <>
              {context.libraryBreadcrumb.length > 0 && <Breadcrumb />}
              {context.libraryBreadcrumb.length === 0 && (
                <FirstLetterSelector />
              )}
            </>
          )}
        />
      </ConditionalImageBackground>
    </SafeAreaView>
  );
};
