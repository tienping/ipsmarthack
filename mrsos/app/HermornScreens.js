import { Navigation } from 'react-native-navigation';
import hermoStyle from 'style/hermoStyle';

import WelcomeScreen from 'components/WelcomeScreen';
import LoginScreen from 'containers/LoginScreen';
import SignUpScreen from 'containers/SignUpScreen';
import SplashScreen from 'containers/SplashScreen';
import SosScreen from 'containers/SosScreen';
// import GetPermissionModal from 'containers/GetPermissionModal';

// Home Screen
import HomeScreen from 'containers/HomeScreen';

// Profile Screen
import UserProfileScreen from 'containers/UserProfileScreen';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('hermorn.screen.Splash', () => SplashScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.Welcome', () => WelcomeScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.Login', () => LoginScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.SignUp', () => SignUpScreen, store, Provider);
    // Navigation.registerComponent('hermorn.screen.Permission', () => GetPermissionModal, store, Provider);

    // Home Screen
    Navigation.registerComponent('hermorn.screen.Home', () => HomeScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.SosScreen', () => SosScreen, store, Provider);

    // Profile Screen
    Navigation.registerComponent('hermorn.screen.Profile', () => UserProfileScreen, store, Provider);
}

export const HermoTabConfig = {
    tabs: [
        {
            label: 'SOS',
            title: 'SOS',
            screen: 'hermorn.screen.SosScreen',
            icon: require('hermo/Resources/ic-home.png'),
            selectedIcon: require('hermo/Resources/ic-home.png'),
            navigatorStyle: {
                navBarHidden: false,
                navBarBackgroundColor: 'white',
                navBarTextColor: hermoStyle.Color,
                navBarButtonColor: hermoStyle.Color,
                navBarNoBorder: false,
            },
            passProps: {},
        },
        {
            label: 'Report',
            title: 'REPORT',
            screen: 'hermorn.screen.Home',
            icon: require('hermo/Resources/ic-home.png'),
            selectedIcon: require('hermo/Resources/ic-home.png'),
            navigatorStyle: {
                navBarHidden: false,
                navBarBackgroundColor: 'white',
                navBarTextColor: hermoStyle.Color,
                navBarButtonColor: hermoStyle.Color,
                navBarNoBorder: false,
            },
            passProps: {},
        },
        {
            label: 'Helper',
            title: 'HELPER',
            screen: 'hermorn.screen.Home',
            icon: require('hermo/Resources/ic-home.png'),
            selectedIcon: require('hermo/Resources/ic-home.png'),
            navigatorStyle: {
                navBarHidden: false,
                navBarBackgroundColor: 'white',
                navBarTextColor: hermoStyle.Color,
                navBarButtonColor: hermoStyle.Color,
                navBarNoBorder: false,
            },
            passProps: {},
        },
        {
            label: 'Profile',
            title: 'PROFILE',
            screen: 'hermorn.screen.Profile',
            icon: require('hermo/Resources/ic-profile.png'),
            selectedIcon: require('hermo/Resources/ic-profile.png'),
            navigatorStyle: {
                navBarHidden: false,
                navBarBackgroundColor: 'white',
                navBarTextColor: hermoStyle.Color,
                navBarButtonColor: hermoStyle.Color,
                navBarNoBorder: false,
            },
            passProps: {},
        },
    ],
    animationType: 'fade',
    title: 'HERMO IS GREAT',
    tabsStyle: {
        tabBarButtonColor: 'rgb(158,158,158)',
        tabBarSelectedButtonColor: 'rgb(136,17,68)',
    },
    appStyle: {
        forceTitlesDisplay: true,
    },
};

let isBottomTabInitialized = false;
export function goToLanding(navigator, scope) {
    if (!isBottomTabInitialized) {
        isBottomTabInitialized = true;
        Navigation.startTabBasedApp(HermoTabConfig);
    } else {
        if (scope.props.onCloseModal) {
            scope.props.onCloseModal();
        }
        navigator.dismissModal();
    }
}
