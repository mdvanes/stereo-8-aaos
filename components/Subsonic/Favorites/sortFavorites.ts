import { LibraryItemType } from "../../../types";
import { isAlbum } from "../Library/getLabel";

export const sortFavorites = (
  f1: LibraryItemType,
  f2: LibraryItemType
): number => {
  const d1 = isAlbum(f1) && f1;
  const d2 = isAlbum(f2) && f2;

  if (!d1 || !d2) {
    return 0;
  }

  const a1 = f1.artist?.toLowerCase();

  const a2 = f2.artist?.toLowerCase();

  if (a1 < a2) {
    return -1;
  }
  if (a1 > a1) {
    return 1;
  }
  return 0;
};
