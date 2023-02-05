import { FC } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "../Themed";

export const ReloadIndicator: FC = () => (
  <View
    style={{
      backgroundColor: "black",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ActivityIndicator size="large" color="white" style={{ width: "50%" }} />
  </View>
);
