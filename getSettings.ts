import { RadioSchemaOptional } from "@mdworld/radio-metadata";
import { getStoredData } from "./components/Settings/getStoredData";

export interface IRadioSetting {
  name: string;
  channelUrl: string;
  schema: RadioSchemaOptional;
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
