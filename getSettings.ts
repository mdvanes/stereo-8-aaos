import settings from "./settings.json";

interface Settings {
  subsonic?: {
    domain?: string;
    user?: string;
    salt?: string;
    password?: string;
  };
}

export const getSettings = (): Settings => {
  return settings;
};
