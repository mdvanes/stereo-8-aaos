import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISettings } from "../../getSettings";

const configUrlStoreKey = "@configUrl";
const configSettingsStoreKey = "@configSettings";
const showFfwdStoreKey = "@showFfwd";

export const storeData = async (data: {
  configUrl: string;
  configSettings: ISettings | undefined;
}) => {
  try {
    await AsyncStorage.setItem(configUrlStoreKey, data.configUrl);
    await AsyncStorage.setItem(
      configSettingsStoreKey,
      JSON.stringify(data.configSettings)
    );
    console.log("done");
  } catch (error) {
    alert("Error saving data");
  }
};

export const getStoredData = async () => {
  const configUrl = await AsyncStorage.getItem(configUrlStoreKey);
  const response = await AsyncStorage.getItem(configSettingsStoreKey);
  try {
    const configSettings: ISettings = response ? JSON.parse(response) : "";
    return { configUrl, configSettings };
  } catch (e) {
    throw Error("invalid json" + response);
  }
};

export const storeShowFfwd = async (data: { showFfwd: boolean }) => {
  try {
    await AsyncStorage.setItem(
      showFfwdStoreKey,
      data.showFfwd ? "true" : "false"
    );

    console.log("done");
  } catch (error) {
    alert("Error saving data");
  }
};

export const getShowFfwd = async (): Promise<{ showFfwd: boolean }> => {
  try {
    const response = await AsyncStorage.getItem(showFfwdStoreKey);

    return { showFfwd: Boolean(response === "true") };
  } catch (error) {
    throw Error("invalid data");
  }
};
