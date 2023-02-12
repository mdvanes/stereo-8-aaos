import { FC, useEffect, useState } from "react";
import KeyEvent from "react-native-keyevent";
import { View, Text } from "../Themed";

export const ShowKeys: FC = () => {
  const [log, setLog] = useState("");

  useEffect(() => {
    KeyEvent.onKeyDownListener((keyEvent: any) => {
      // TODO does not work on web, but does work on emulator. E.g. arrow down:  LOG  onKeyDown keyCode: 20 LOG  Action: 0 LOG  Key:
      console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
      console.log(`Action: ${keyEvent.action}`);
      console.log(`Key: ${keyEvent.pressedKey}`);
      setLog(
        `keycode=${keyEvent.keyCode} action=${keyEvent.action} key=${keyEvent.pressedKey}`
      );
    });

    return () => {
      KeyEvent.removeKeyDownListener();
    };
  }, []);

  return (
    <View
      style={{
        borderColor: "white",
        borderWidth: 1,
        padding: 20,
        marginVertical: 30,
      }}
    >
      <Text>show keys: {log}</Text>
    </View>
  );
};
