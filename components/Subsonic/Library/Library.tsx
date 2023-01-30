import { FontAwesome } from "@expo/vector-icons";
import React, { FC, useContext, useEffect } from "react";
import { Pressable, SafeAreaView, SectionList, Text } from "react-native";
import {
  Artist,
  LibraryItemType,
  MusicDirectoryAlbum,
  MusicDirectorySong,
} from "../../../types";
import { PlayContext } from "../../context/play-context";
import { styles as itemStyles } from "../../item.styles";
import { View } from "../../Themed";
import { getIndexes, getMusicDir } from "../getSubsonic";
import { styles } from "./Library.styles";

const isArtist = (item: LibraryItemType): item is Artist => {
  return "name" in item;
};

const isAlbum = (item: LibraryItemType): item is MusicDirectoryAlbum => {
  return "isDir" in item && item.isDir;
};

const getLabel = (item: LibraryItemType): string => {
  if (isArtist(item)) {
    return item.name ?? "";
  }
  if (isAlbum(item)) {
    return item.album ?? item.title ?? "";
  }
  return item.title ?? "";
};

const LibraryDirItem: FC<{ item: Artist | MusicDirectoryAlbum }> = ({
  item,
}) => {
  const context = useContext(PlayContext);
  const label = getLabel(item);

  return (
    <Pressable
      style={itemStyles.item_pressable}
      onPress={async () => {
        const dirs = await getMusicDir(item.id ?? "");
        context.setLibraryBreadcrumb((prev: string[]) => [...prev, item]);
        context.setLibraryItems(dirs);
      }}
    >
      <Text style={[styles.libraryItem, itemStyles.line]}>
        <FontAwesome name="folder" size={20} style={{ marginRight: 15 }} />{" "}
        {label}
      </Text>
    </Pressable>
  );
};

const LibrarySongItem: FC<{ item: MusicDirectorySong }> = ({ item }) => {
  const context = useContext(PlayContext);

  const track = item.track ? `${item.track?.toString().padStart(2, "0")}.` : "";

  return (
    <Pressable
      style={itemStyles.item_pressable}
      onPress={async () => {
        context.setStartSongId(item.id);
      }}
    >
      <Text style={[styles.libraryItem, itemStyles.line]}>
        {track} {item.title}
      </Text>
    </Pressable>
  );
};

const LibraryItem: FC<{ item: LibraryItemType }> = ({ item }) => {
  if (isArtist(item) || isAlbum(item)) {
    return <LibraryDirItem item={item} />;
  }
  return <LibrarySongItem item={item} />;
};

const FirstLetterSelector: FC = () => {
  const context = useContext(PlayContext);
  return (
    <View style={{ flexDirection: "row" }}>
      {context.libraryIndexes.map((indexItem) => {
        return (
          <Pressable
            key={indexItem.name}
            style={{ marginHorizontal: 10 }}
            onPress={async () => {
              context.setLibraryItems(indexItem?.artist ?? []);
              context.setLibraryBreadcrumb([{ name: indexItem.name }]);
            }}
          >
            <Text style={[styles.libraryItem]}>{indexItem.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

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
      <SectionList
        sections={[{ title: "", data: context.libraryItems }]}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => (
          <LibraryItem
            item={item}
            // onClick={handlePlaySong}
            // TODO activeId={context.song?.id}
            // {...item}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <>
            {context.libraryBreadcrumb.length > 0 && (
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.libraryItem]}>
                  <Pressable
                    onPress={async () => {
                      const x = context.libraryIndexes[0];
                      if (x) {
                        context.setLibraryItems(x.artist ?? []);
                        context.setLibraryBreadcrumb([]);
                      }
                    }}
                  >
                    <Text style={[styles.libraryItem]}>Library</Text>
                  </Pressable>{" "}
                </Text>

                {context.libraryBreadcrumb.map((x) => (
                  <>
                    <FontAwesome
                      name="caret-right"
                      size={20}
                      style={{ marginHorizontal: 15, color: "white" }}
                    />
                    <Text style={styles.libraryItem}>{getLabel(x)}</Text>
                  </>
                ))}
              </View>
            )}
            {context.libraryBreadcrumb.length === 0 && <FirstLetterSelector />}
          </>
        )}
      />
    </SafeAreaView>
  );
};
