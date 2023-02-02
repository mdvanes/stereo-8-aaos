# Stereo 8 (AAOS App)

There are very few AAOS apps and the ones that are there have weird limitations (can't select certain stations from the app, e.g for a radio streamer) or they add their own ads and they are not FOSS.

Made with [React Native](https://reactnative.dev)

Requires `npm i -g expo-cli eas-cli`

## Develop

Make sure a settings.json (see settings.json.example) exists on some public URL and load + save it from the Settings page to be able to connect to your server.

Run with `npm start` and press `w`

Test on Android:

- install https://play.google.com/store/apps/details?id=host.exp.exponent
- TODO requires adb on the path
- run `npm start`
- scan the QR code in terminal with the App
- when an old version shows, try "pull down to refresh"

on emulator:

- run `npm start`
- press "a"
- install the devbuild.apk (drag into emulator)
- fetch development servers
- click URL in the dev app

## Build

Building is done online at [Expo](https://expo.dev/). This requires an account.

- update version: `npm run bump XX`
- `eas build -p android` (NOTE: build only APK: `eas build -p android --profile previewApk`)
- use the URL listed by the CLI and download AAB (or log into expo.dev dashboard, under Builds)
- push and tag on Github

## Publish to Google Play Store (Closed Testing)

- Go to https://play.google.com/console
- Testing > Closed Testing
- In the top bar, switch the dropdown to "Automotive OS only" and click on the "manage track" behind Active Track below: "Closed testing - Stereo8Testing"
- Click "Create new release"
- Drag the AAB file in
- Click "Review Release"
- Click "Start rollout to Closed Testing..."
- (Is this needed?) Go to Publishing Overview and click "Send 1 change for review"
- Wait 2 weeks...

## Publish to Google Play Store (Notes)

I have not done this fully, because I'm the only user. So I just go to https://play.google.com/console and do a "Start testing now" alpha release for my own account.

This just needs an the AAB (App release bundle) files to be uploaded.

AAOS is listed under Release > Setup > Advanced settings > Release types. Then "Automotive OS only" is available on the Internal testing release page.

Continue Internal test release with "review" and then "roll out to test devices"

After releasing for internal testing go to the "Testers" tab and use the "copy link" and open this on the device

A normal release: Left menu bar > "Internal testing"

A AAOS release: Left menu bar > "Advanced Settings" > "Release types" > "Release an Android Automotive OS app bundle or APK to a test track >" > "Review and roll out release"
This now fails with "APKs or Android App Bundles in this track must require the following features:android.hardware.type.automotive."
See https://developer.android.com/guide/topics/manifest/uses-feature-element#hw-features

- Expo is managing ios and android files internally. Try `react-native eject`
  - Eject: `expo eject`
  - dir is created: android/
  - update `version code` in `android/app/build.gradle` and `app.json`
  - OUTDATED (settings are loaded in the app now): settings.json is in gitigore, set on expo like this:
    - `base64 settings.json`
    - `eas secret:create` with SETTINGS_BASE64
  - still build with: `eas build -p android` (requires `npm i -g eas-cli`)
  - build only APK: `eas build -p android --profile previewApk`
  - NOT NEEDED build with: cd android/ && ./gradlew
  - NOT NEEDED result in android/app/?
  - (source: https://moleman1024.github.io/audiowagon/developers.html) Internal testing does not work: Right now “Internal Testing” is not supported for apps using AAOS features. My experience: everything works, you can select "install on device" but it never shows up in the car.
  - AAOS is listed under Release > Setup > Advanced settings > Release types. Then "Automotive OS only" is available on the Internal testing release page.
  - Try Closed testing (initial review time ca. 1 week). When finished with the Interal Testing process, click "promote release" and select create new track.
- The bundle build from Android Studio fails with: You uploaded an APK or Android App Bundle that was signed in debug mode. You need to sign your APK or Android App Bundle in release mode. Then you need: https://reactnative.dev/docs/signed-apk-android

To run on Android phone, in AndroidManifest.xml turn on:

```xml
<intent-filter>
    <action android:name="android.intent.action.MAIN"/>
    <category android:name="android.intent.category.LAUNCHER"/>
</intent-filter>
```

### set up Android studio

Building for automotive requires a modification like https://reactnative.dev/docs/building-for-tv
instead of: <category android:name="android.intent.category.LEANBACK_LAUNCHER"/>
use: ??? https://developer.android.com/guide/topics/manifest/uses-feature-element#hw-features

APKs or Android App Bundles in this track must require the following features:android.hardware.type.automotive.

Building with Expo does not set up an AndroidManifest.xml

https://reactnative.dev/docs/environment-setup

## Notes

- Dark mode is forced by setting `userInterfaceStyle` to `dark` in `app.json` instead of `automatic`. Also see https://docs.expo.dev/guides/color-schemes/, updating icons/force dark mode does not work because app.json is not processed. https://stackoverflow.com/questions/53697882/change-expo-generated-application-icon. It's now fixed by hard coding the value of the useColorSchema hook.
- Previously used this in package.json: "eas-build-pre-install": "echo $SETTINGS_BASE64 | base64 --decode > settings.json",

## TODO

- FIXED v1.0.17: enhancement: playlists etc are centered, should be left aligned
- FIXED v1.0.17: bug: driver distraction mode goes on when driving. try adding `<meta-data android:name="distractionOptimized" android:value="true"/>` https://source.android.com/docs/devices/automotive/driver_distraction/guidelines#do
- FIXED v1.0.19: bug: still switches to light mode: reproducable when using cmd+shift+P > emulate CSS prefers color light
- FIXED v1.0.20: feat: read config from JSON on (external) storage (e.g. USB drive) -> not possible with react-native-fs, can't read from USB. Use service call
- FIXED v1.0.20: feat: fix radio nowplaying
- FIXED v1.0.21: bug: play button (/ click on row) does not work
- FIXED v1.0.23 fix app icon
- FIXED v1.0.23 debt: remove salt from config and store only salt + salted pw in Async store
- FIXED v1.0.23 bug: double back button (only on playlist, works well on modal!)
- FIXED v1.0.23 restyle bottombar, image on background and poll radio meta data
- FIXED v1.0.23 highlight active row
- FIXED v1.0.23 log previously played on radio
- FIXED v1.0.23 bug: way too many rerenders because Context contains progress and that updates every second. Either use memo/callback or put progress in separate context.
- FIXED v1.0.23 feat: browse all "artists > albums > songs" instead of only playlists
- v1.0.24 play loop for library
- rename previous tab to radio and add buttons for stations
- bug: topbar (statusbar) on car is black with dark text (only during the day)
- enhancement: mark an album as "local favorite"

- bug: see mail after publish with eligibility issues
- enhancement: add offline mode for playlists and albums (not songs) (remove expo-file-system from package.json if not used)
- enhancement: allow use of hardware buttons - https://developer.android.com/reference/kotlin/androidx/media/session/MediaButtonReceiver & https://reactnative.dev/docs/backhandler
- enhancement: re-introduce tabs with playlists but also album view. See commits from before 1.0.19 navigation/index.tsx bottom-tab-navigator
- enhancement: multiple radio stations
- enhancement: show something on the car home screen instead of just the app name
