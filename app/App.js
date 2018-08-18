/**
 *
 * App - Main Entry Point
 *
 */
import 'babel-polyfill';
import { Provider } from 'react-redux';
import configureStore from 'hermo/configureStore';
import { Text } from 'react-native';

// import FirebaseRemoteConfig from 'utils/remoteConfigService';
// import pushAttendanceNotification from 'utils/notificationService';

import { Navigation } from 'react-native-navigation';
import { registerScreens } from 'hermo/HermornScreens';

export const store = configureStore({});
registerScreens(store, Provider);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'hermorn.screen.Splash',
        title: 'HERMO',
        navigatorStyle: {
            navBarHidden: true,
            tabBarHidden: true,
        },
    },
});

// console.disableYellowBox = true;

// pushAttendanceNotification();
// FirebaseRemoteConfig();

Text.defaultProps.allowFontScaling = false;
export default function App() {

}
