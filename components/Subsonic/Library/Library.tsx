import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Pressable, SectionList, Text, View } from "react-native";
import { PlayContext } from "../../context/play-context";
import {
  Artist,
  getIndexes,
  getMusicDir,
  MusicDirectory,
  MusicDirectoryAlbum,
  MusicDirectorySong,
} from "../getSubsonic";
import { styles } from "./Library.styles";
import { styles as itemStyles } from "../../item.styles";

type LibraryItemType = Artist | MusicDirectoryAlbum | MusicDirectorySong;

const isArtist = (item: LibraryItemType): item is Artist => {
  return "name" in item;
};

const isAlbum = (item: LibraryItemType): item is MusicDirectoryAlbum => {
  return "album" in item && item.isDir;
};

const LibraryArtistItem: FC<{ item: Artist }> = ({ item }) => {
  return (
    <Pressable
      style={itemStyles.item_pressable}
      onPress={async () => {
        const x = await getMusicDir(item.id ?? "");
        console.log(item.id, x);
        // setItems(x); // TODO store in context!
      }}
    >
      <Text style={[styles.libraryItem, itemStyles.line]}>{item.name}</Text>
    </Pressable>
  );
};

const LibraryAlbumItem: FC<{ item: MusicDirectoryAlbum }> = ({ item }) => {
  return <Text style={styles.libraryItem}>{item.album}</Text>;
};

const LibraryItem: FC<{ item: LibraryItemType }> = ({ item }) => {
  if (isArtist(item)) {
    return <LibraryArtistItem item={item} />;
  }
  if (isAlbum(item)) {
    return <LibraryAlbumItem item={item} />;
  }
  return <Text style={styles.libraryItem}>{item.isDir}</Text>;
};

export const Library: FC = () => {
  const context = useContext(PlayContext);
  const [items, setItems] = useState<Artist[] | MusicDirectory[]>([]);

  const init = async () => {
    // setIsLoading(true);
    setItems(await getIndexes());
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
    <>
      <View
        style={{
          flex: 1,
          // justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Library</Text>
        {/* <Text style={{ color: "white", fontSize: 24 }}>
      </Text> */}
        {/* {items.map((a) => {
          const artistName = "name" in a ? a.name : null;
          const albumName = "album" in a ? a.album : null;
          // @ts-expect-error
          const songName = a.track + a.title;
          return (
            <Button
              title={artistName || songName || albumName || ""}
              key={a.id}
              onPress={async () => {
                const x = await getMusicDir(a.id ?? "");
                console.log(a.id, x);
                setItems(x);
              }}
            />
          );
        })} */}
      </View>
      <SectionList
        sections={[{ title: "", data: items }]}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => (
          <LibraryItem
            item={item}
            // onClick={handlePlaySong}
            // activeId={context.song?.id}
            // {...item}
          />
        )}
        renderSectionHeader={({ section: { title } }) => <Text>{title}?</Text>}
      />
    </>
  );
};
