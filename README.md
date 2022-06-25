# Stereo 8 (AAOS App)

There are very few AAOS apps and the ones that are there have weird limitations (can't select certain stations from the app, e.g for a radio streamer) or they add their own ads and they are not FOSS.

Made with [React Native](https://reactnative.dev)

Requires `npm i -g expo-cli`

Develop: Run with `npm start` and press `w`

Test on Android: install https://play.google.com/store/apps/details?id=host.exp.exponent and run `npm start` and scan the QR code in terminal with the App.

Build: 

Building is done online at [Expo](https://expo.dev/). This requires an account.

- npm i -g eas-cli
- update version code in app.json
- eas build -p android
- log into expo.dev dashboard and download AAB (under Builds or just use the URL listed by the CLI)

## Publish to Google Play Store

I have not done this fully, because I'm the only user. So I just go to https://play.google.com/console and do a "Start testing now" alpha release for my own account.

This just needs an the AAB (App release bundle) files to be uploaded.

AAOS is listed under Release > Setup > Advanced settings > Release types. Then "Automotive OS only" is available on the Internal testing release page.

Continue Internal test release with "review" and then "roll out to test devices"

After releasing for internal testing go to the "Testers" tab and use the "copy link" and open this on the device

A normal release: Left menu bar > "Internal testing"

A AAOS release: Left menu bar > "Advanced Settings" > "Release types" > "Release an Android Automotive OS app bundle or APK to a test track >" > "Review and roll out release" 
This now fails with "APKs or Android App Bundles in this track must require the following features:android.hardware.type.automotive."
See https://developer.android.com/guide/topics/manifest/uses-feature-element#hw-features
* Expo is managing ios and android files internally. Try `react-native eject`
    * Eject: `expo eject`
    * dir is created: android/
    * update `version code` in `android/build.gradle` and `app.json`
    * still build with: `eas build -p android` (requires `npm i -g eas-cli`)
    * NOT NEEDED build with: cd android/ && ./gradlew
    * NOT NEEDED result in android/app/?
    * (source: https://moleman1024.github.io/audiowagon/developers.html) Internal testing does not work: Right now “Internal Testing” is not supported for apps using AAOS features. My experience: everything works, you can select "install on device" but it never shows up in the car.
    * AAOS is listed under Release > Setup > Advanced settings > Release types. Then "Automotive OS only" is available on the Internal testing release page.
    * Try Closed testing (initial review time ca. 1 week). When finished with the Interal Testing process, click "promote release" and select create new track.
* The bundle build from Android Studio fails with: You uploaded an APK or Android App Bundle that was signed in debug mode. You need to sign your APK or Android App Bundle in release mode. Then you need: https://reactnative.dev/docs/signed-apk-android


### set up Android studio

Building for automotive requires a modification like https://reactnative.dev/docs/building-for-tv
instead of: <category android:name="android.intent.category.LEANBACK_LAUNCHER"/>
use: ??? https://developer.android.com/guide/topics/manifest/uses-feature-element#hw-features

APKs or Android App Bundles in this track must require the following features:android.hardware.type.automotive.

Building with Expo does not set up an AndroidManifest.xml

https://reactnative.dev/docs/environment-setup
