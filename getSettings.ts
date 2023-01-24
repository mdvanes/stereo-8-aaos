import { getStoredData } from "./components/Settings/Settings";

export interface IRadioSetting {
  name: string;
  channelUrl: string;
  metaTracksUrl: string;
  metaBroadcastUrl: string;
}

export interface ISettings {
  subsonic?: {
    domain?: string;
    user?: string;
    salt?: string;
    password?: string;
  };
  radio?: IRadioSetting[];
}

export const getSettings = async (): Promise<ISettings> => {
  const response = await getStoredData();
  return response?.configSettings ?? {};
};
