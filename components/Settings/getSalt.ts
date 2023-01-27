export const getSalt = (): string => {
  // This package should work, but it fails on Android:
  // expo-standard-web-crypto
  // import * as Random from "expo-random";
  // const randomBytes = Random.getRandomBytes(20);
  // const salt = Buffer.from(randomBytes).toString("base64");
  const salt = new Array(20)
    .fill(0)
    .map((_) => {
      // NOTE: not cryptographically safe way to get a random hex char
      return Math.floor(Math.random() * 16).toString(16);
    })
    .join("");
  return salt;
};
