import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  return "dark"; // Force dark mode this way, userInterfaceStyle is ignored somehow. See https://docs.expo.dev/guides/color-schemes/
  // return _useColorScheme() as NonNullable<ColorSchemeName>;
}
