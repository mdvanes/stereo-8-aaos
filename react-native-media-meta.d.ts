interface MediaMetaResponse {
    thumb: string;
    duration?: number;
    width: string;
    height: string;
}

declare module "react-native-media-meta" {
  export const get = (path: string): Promise<MediaMetaResponse> => {};
}
