package my.hermo.hermo;

import com.taskrabbit.zendesk.*;
import com.zopim.android.sdk.api.ZopimChat;
import android.app.Application;
import com.facebook.react.ReactApplication;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import fr.snapp.imagebase64.RNImgToBase64Package;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.ipay88.IPay88Package;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import io.branch.rnbranch.RNBranchPackage;
import java.util.Arrays;
import java.util.List;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.realm.react.RealmReactPackage;
import io.branch.rnbranch.RNBranchPackage;
import io.branch.referral.Branch;
import com.facebook.react.ReactApplication;
import com.bugsnag.BugsnagReactNative;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.moengage.core.MoEngage;
import com.moe.pushlibrary.MoEHelper;
import com.moengage.react.MoEReactPackage;
import com.smixx.fabric.FabricPackage;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.imagepicker.ImagePickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.molpayxdk.MOLPayReactPackage;
import com.reactnativenavigation.NavigationApplication;

public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new RNZendeskChatPackage(),
            new RNImgToBase64Package(),
            new SnackbarPackage(),
            new IPay88Package(),
            new RNBranchPackage(),
            new RNDeviceInfo(),
            BugsnagReactNative.getPackage(),
            new VectorIconsPackage(),
            new RealmReactPackage(),
            new RNSpinkitPackage(),
            new ImagePickerPackage(),
            new RNI18nPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNFirebasePackage(),
            new RNFirebaseAnalyticsPackage(),
            new RNFirebaseRemoteConfigPackage(),
            new ReactNativePushNotificationPackage(),
            new FabricPackage(),
            new MOLPayReactPackage(),
            new MoEReactPackage(),
            new ReactNativeOneSignalPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    @Override
    public void onCreate() {
        super.onCreate();
        AppEventsLogger.activateApp(this);
        BugsnagReactNative.start(this);
        Branch.getAutoInstance(this);
        SoLoader.init(this, /* native exopackage */ false);
        Fabric.with(this, new Crashlytics());
        MoEHelper.getInstance(getApplicationContext()).autoIntegrate(this);
        MoEngage moEngage =
            new MoEngage.Builder(this, "6ME0ZUA8SSD9N47LBFXSI5LK")
                .build();
        MoEngage.initialise(moEngage);
        ZopimChat.init("3mjdA98cWgnyvtknHJr6Ts5X4h7IdgDe").build();
    }

}
