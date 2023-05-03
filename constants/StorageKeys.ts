export const favoritesStoreKey = "@favorites";
export const lastPlayedItemStoreKey = "@lastPlayedItem";

export interface ILastPlayedItem {
  id?: string;
  name?: string;
  type?: string;
  songId?: string;
}
