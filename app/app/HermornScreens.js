import { Navigation } from 'react-native-navigation';
import hermoStyle from 'style/hermoStyle';

import WelcomeScreen from 'components/WelcomeScreen';
import LoginScreen from 'containers/LoginScreen';
import SignUpScreen from 'containers/SignUpScreen';
import SplashScreen from 'containers/SplashScreen';
// import GetPermissionModal from 'containers/GetPermissionModal';

// Home Screen
import HomeScreen from 'containers/HomeScreen';
import Search from 'containers/Search';
import CampaignViewer from 'containers/CampaignViewer';
import BundleBoxScreen from 'containers/BundleBoxScreen';
import BundleBoxConfirmScreen from 'containers/BundleBoxConfirmScreen';

// Explore Screen
import Explore from 'containers/ExploreScreen';
import BrandScreen from 'containers/BrandScreen';
import CategoryScreen from 'containers/CategoryScreen';
import VerticalListingView from 'components/VerticalListingView';
import DynamicListingScreen from 'containers/DynamicListingScreen';
import ProductInfoScreen from 'containers/ProductInfoScreen';
import HerListingScreen from 'containers/HerListingScreen';

// Herfeed Screen
import Herfeed from 'containers/HerfeedScreen';
import BeautyPostForm from 'containers/BeautyPostForm';

// Cart Screen
import Cart from 'containers/CartScreen';
import CheckoutScreen from 'containers/CheckoutScreen';
import BeautyGrabScreen from 'containers/BeautyGrabScreen';

// Profile Screen
import UserProfileScreen from 'containers/UserProfileScreen';
import UpdateUserProfile from 'containers/UpdateUserProfile';
import UserSkinProfileScreen from 'containers/UserSkinProfileScreen';
import OrderDetailScreen from 'containers/OrderDetailScreen';
import MemberScreen from 'components/MemberScreen';
import WalletScreen from 'containers/WalletScreen';
import AboutHermoScreen from 'components/AboutHermoScreen';
import AboutPaymentScreen from 'components/AboutPaymentScreen';
import FaqScreen from 'components/FaqScreen';
import ContactUsScreen from 'components/ContactUsScreen';
import PrivacyPolicyScreen from 'components/PrivacyPolicyScreen';
import JoinUsScreen from 'components/JoinUsScreen';
import FeedbackScreen from 'containers/FeedbackScreen';
import VoucherScreen from 'containers/VoucherScreen';
import AddAdressScreen from 'containers/AddAdressScreen';
import ResetPasswordScreen from 'containers/ResetPasswordScreen';
import AddressBookScreen from 'containers/AddressBookScreen';
import OrderListScreen from 'containers/OrderListScreen';
import OrderSummaryPage from 'containers/OrderSummaryPage';
import WishListScreen from 'components/WishListScreen';
import PopupDialog from 'containers/PopupDialog';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('hermorn.screen.Splash', () => SplashScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.Welcome', () => WelcomeScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.Login', () => LoginScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.SignUp', () => SignUpScreen, store, Provider);
    // Navigation.registerComponent('hermorn.screen.Permission', () => GetPermissionModal, store, Provider);

    // Home Screen
    Navigation.registerComponent('hermorn.screen.Home', () => HomeScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.Search', () => Search, store, Provider);
    Navigation.registerComponent('hermorn.screen.CampaignViewer', () => CampaignViewer, store, Provider);
    Navigation.registerComponent('hermorn.screen.BundleBox', () => BundleBoxScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.BundleConfirmation', () => BundleBoxConfirmScreen, store, Provider);

    // Explore Screen
    Navigation.registerComponent('hermorn.screen.Explore', () => Explore, store, Provider);
    Navigation.registerComponent('hermorn.screen.Brand', () => BrandScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.Category', () => CategoryScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.VerticalListing', () => VerticalListingView, store, Provider);
    Navigation.registerComponent('hermorn.screen.DynamicListing', () => DynamicListingScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.ProductInfo', () => ProductInfoScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.HerListing', () => HerListingScreen, store, Provider);

    // Herfeed Screen
    Navigation.registerComponent('hermorn.screen.Herfeed', () => Herfeed, store, Provider);
    Navigation.registerComponent('hermorn.screen.BeautyPostForm', () => BeautyPostForm, store, Provider);

    // Cart Screen
    Navigation.registerComponent('hermorn.screen.Cart', () => Cart, store, Provider);
    Navigation.registerComponent('hermorn.screen.Checkout', () => CheckoutScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.BeautyGrab', () => BeautyGrabScreen, store, Provider);

    // Profile Screen
    Navigation.registerComponent('hermorn.screen.Profile', () => UserProfileScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.UpdateUserProfile', () => UpdateUserProfile, store, Provider);
    Navigation.registerComponent('hermorn.screen.UserSkinProfile', () => UserSkinProfileScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.OrderDetail', () => OrderDetailScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.Member', () => MemberScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.Wallet', () => WalletScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.AboutHermo', () => AboutHermoScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.AboutPayment', () => AboutPaymentScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.FAQ', () => FaqScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.ContactUs', () => ContactUsScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.PrivacyPolicy', () => PrivacyPolicyScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.JoinUs', () => JoinUsScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.Feedback', () => FeedbackScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.Voucher', () => VoucherScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.AddAdress', () => AddAdressScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.ResetPassword', () => ResetPasswordScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.AddressBook', () => AddressBookScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.OrderList', () => OrderListScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.OrderSummary', () => OrderSummaryPage, store, Provider);
    Navigation.registerComponent('hermorn.screen.WishList', () => WishListScreen, store, Provider);
    Navigation.registerComponent('hermorn.screen.PopupDialog', () => PopupDialog, store, Provider);
}

export const HermoTabConfig = {
    tabs: [
        {
            label: 'Store',
            title: 'STORE',
            screen: 'hermorn.screen.Home',
            icon: require('hermo/Resources/ic-home.png'),
            selectedIcon: require('hermo/Resources/ic-home.png'),
            navigatorStyle: {
                navBarTextFontSize: 15,
                navigationBarColor: '#000000',
                navBarTitleTextCentered: true,
                navBarHidden: false,
                navBarBackgroundColor: 'white',
                navBarTextColor: hermoStyle.Color,
                navBarButtonColor: hermoStyle.Color,
                navBarNoBorder: false,
            },
            passProps: {},
        },
        {
            label: 'Explore',
            title: 'EXPLORE',
            screen: 'hermorn.screen.Explore',
            icon: require('hermo/Resources/ic-explore.png'),
            selectedIcon: require('hermo/Resources/ic-explore.png'),
            navigatorStyle: {
                navBarTextFontSize: 15,
                navigationBarColor: '#000000',
                navBarTitleTextCentered: true,
                navBarHidden: false,
                navBarBackgroundColor: 'white',
                navBarTextColor: hermoStyle.Color,
                navBarButtonColor: hermoStyle.Color,
                navBarNoBorder: false,
            },
            passProps: {},
        },
        {
            label: 'Reviews',
            title: 'REVIEWS',
            screen: 'hermorn.screen.Herfeed',
            icon: require('hermo/Resources/ic-news.png'),
            selectedIcon: require('hermo/Resources/ic-news.png'),
            navigatorStyle: {
                navBarTextFontSize: 15,
                navigationBarColor: '#000000',
                navBarTitleTextCentered: true,
                navBarHidden: false,
                navBarBackgroundColor: 'white',
                navBarTextColor: hermoStyle.Color,
                navBarButtonColor: hermoStyle.Color,
                navBarNoBorder: false,
            },
            passProps: {},
        },
        {
            label: 'Cart',
            title: 'CART',
            screen: 'hermorn.screen.Cart',
            icon: require('hermo/Resources/ic-cart.png'),
            selectedIcon: require('hermo/Resources/ic-cart.png'),
            navigatorStyle: {
                navBarTextFontSize: 15,
                navigationBarColor: '#000000',
                navBarTitleTextCentered: true,
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
                navBarTextFontSize: 15,
                navigationBarColor: '#000000',
                navBarTitleTextCentered: true,
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
