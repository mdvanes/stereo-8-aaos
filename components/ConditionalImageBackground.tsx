import { FC } from "react";
import { ImageBackground } from "react-native";

export const ConditionalImageBackground: FC<{ img?: string }> = ({
  img,
  children,
}) => {
  if (!img) {
    return <>{children}</>;
  }
  return (
    <ImageBackground
      source={{ uri: img }}
      resizeMode="contain"
      imageStyle={{ opacity: 0.2 }}
    >
      {children}
    </ImageBackground>
  );
};
