package com.mdworld.stereo8aaos;

import android.os.Build;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import expo.modules.ReactActivityDelegateWrapper;

import android.view.KeyEvent; // <--- import
import com.github.kevinejohn.keyevent.KeyEventModule; // <--- import

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // Set the theme to AppTheme BEFORE onCreate to support 
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    super.onCreate(null);
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "main";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this,
      new ReactActivityDelegate(this, getMainComponentName())
    );
  }

  /**
   * Align the back button behavior with Android S
   * where moving root activities to background instead of finishing activities.
   * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
   */
  @Override
  public void invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        // For non-root activities, use the default implementation to finish them.
        super.invokeDefaultOnBackPressed();
      }
      return;
    }

    // Use the default back button implementation on Android S
    // because it's doing more than {@link Activity#moveTaskToBack} in fact.
    super.invokeDefaultOnBackPressed();
  }

  @Override  // <--- Add this method if you want to react to keyDown
  public boolean onKeyDown(int keyCode, KeyEvent event) {

    // A. Prevent multiple events on long button press
    //    In the default behavior multiple events are fired if a button
    //    is pressed for a while. You can prevent this behavior if you
    //    forward only the first event:
    //        if (event.getRepeatCount() == 0) {
    //            KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
    //        }
    //
    // B. If multiple Events shall be fired when the button is pressed
    //    for a while use this code:
    //        KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
    //
    // Using B.
    KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);

    // There are 2 ways this can be done:
    //  1.  Override the default keyboard event behavior
    //    super.onKeyDown(keyCode, event);
    //    return true;

    //  2.  Keep default keyboard event behavior
    //    return super.onKeyDown(keyCode, event);

    // Using method #1 without blocking multiple
    super.onKeyDown(keyCode, event);
    return true;
  }

  // @Override  // <--- Add this method if you want to react to keyUp
  // public boolean onKeyUp(int keyCode, KeyEvent event) {
  //   KeyEventModule.getInstance().onKeyUpEvent(keyCode, event);

  //   // There are 2 ways this can be done:
  //   //  1.  Override the default keyboard event behavior
  //   //    super.onKeyUp(keyCode, event);
  //   //    return true;

  //   //  2.  Keep default keyboard event behavior
  //   //    return super.onKeyUp(keyCode, event);

  //   // Using method #1
  //   super.onKeyUp(keyCode, event);
  //   return true;
  // }

  @Override
  public boolean onKeyMultiple(int keyCode, int repeatCount, KeyEvent event) {
      KeyEventModule.getInstance().onKeyMultipleEvent(keyCode, repeatCount, event);
      return super.onKeyMultiple(keyCode, repeatCount, event);
  }
}
