# Stereo 8 (AAOS App)

There are very few AAOS apps and the ones that are there have weird limitations (can't select certain stations from the app, e.g for a radio streamer) or they add their own ads and they are not FOSS.

Made with [React Native](https://reactnative.dev)

Requires `npm i -g expo-cli`

Develop: Run with `npm start` and press `w`

Test on Android: install https://play.google.com/store/apps/details?id=host.exp.exponent and run `npm start` and scan the QR code in terminal with the App.

Build: 

Building is done online at [Expo](https://expo.dev/). This requires an account.

- npm i -g eas-cli
- eas build -p android
- log into expo.dev dashboard and download AAB (under Builds or just use the URL listed by the CLI)

## Publish to Google Play Store

I have not done this fully, because I'm the only user. So I just go to https://play.google.com/console and do a "Start testing now" alpha release for my own account.

This just needs an the AAB (App release bundle) files to be uploaded.

After releasing for internal testing, 
