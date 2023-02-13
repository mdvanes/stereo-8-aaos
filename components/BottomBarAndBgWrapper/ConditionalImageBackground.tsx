import { FC } from "react";
import { ImageBackground } from "react-native";

export const ConditionalImageBackground: FC<{ img?: string | number }> = ({
  img,
  children,
}) => {
  if (!img) {
    return <>{children}</>;
  }
  return (
    <ImageBackground
      // string is a remote path, number is require() local path
      source={typeof img === "string" ? { uri: img } : img}
      resizeMode="contain"
      imageStyle={{ opacity: 0.2 }}
      style={{ flex: 1, width: "100%" }}
    >
      {children}
    </ImageBackground>
  );
};
