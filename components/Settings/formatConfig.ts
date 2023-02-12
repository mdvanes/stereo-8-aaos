import { ISettings } from "../../getSettings";

export const formatConfig = (configSettings: ISettings | undefined) => {
  if (!configSettings) {
    return "";
  }

  const radio1 =
    configSettings.radio?.length && configSettings.radio.length > 0
      ? configSettings.radio[0]
      : null;

  return `
Subsonic URL: ${configSettings.subsonic?.domain}
Subsonic user: ${configSettings.subsonic?.user}
Subsonic password: ${configSettings.subsonic?.saltedPassword ? "***" : ""}

Nr of radio channels: ${configSettings.radio?.length}
${configSettings.radio?.map((radio, index) =>
  radio
    ? `Radio channel ${index + 1}: ${radio.name} ${radio.channelUrl}`
    : ""
).join('\n')}

   `;
};
