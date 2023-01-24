import { getStoredData } from "./components/Settings/Settings";

export interface ISettings {
  subsonic?: {
    domain?: string;
    user?: string;
    salt?: string;
    password?: string;
  };
  radio?: { url: string; name: string; metaUrl?: string }[];
}

export const getSettings = async (): Promise<ISettings> => {
  const response = await getStoredData();
  return response?.configSettings ?? {};
};
