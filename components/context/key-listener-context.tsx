import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { IPlaylist } from "../Subsonic/getSubsonic";
import { Audio } from "expo-av";
import { IndexItem, LibraryItemType, MusicDirectorySong } from "../../types";
import { IRadioSetting } from "../../getSettings";
import KeyEvent from "react-native-keyevent";
import { useKeyListener } from "./use-key-listener";

export interface KeyListenerValues {
  keyEventLog: string;
}

export const defaultKeyListenerValues: KeyListenerValues = {
  keyEventLog: "",
};

export const KeyListenerContext = createContext({
  keyEventLog: defaultKeyListenerValues.keyEventLog,
});

export const KeyListenerContextProvider: FC<{
  children?: ReactNode | undefined;
}> = ({ children }) => {
  const { keyEventLog } = useKeyListener();

  return (
    <KeyListenerContext.Provider
      value={{
        keyEventLog,
      }}
    >
      {children}
    </KeyListenerContext.Provider>
  );
};
