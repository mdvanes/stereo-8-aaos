import { getStoredData } from "./components/Settings/Settings";

export interface IRadioSetting {
  name: string;
  channelUrl: string;
  metaTracksUrl: string;
  metaBroadcastUrl: string;
}

interface ISubsonicSetting {
  domain?: string;
  user?: string;
  salt?: string;
  saltedPassword?: string;
}

export interface ISettings {
  subsonic?: ISubsonicSetting;
  radio?: IRadioSetting[];
}

export interface ISettingsResponse {
  subsonic?: Omit<ISubsonicSetting, "salt" | "saltedPassword"> & {
    password?: string;
  };
  radio?: IRadioSetting[];
}

export const getSettings = async (): Promise<ISettings> => {
  const response = await getStoredData();
  return response?.configSettings ?? {};
};
