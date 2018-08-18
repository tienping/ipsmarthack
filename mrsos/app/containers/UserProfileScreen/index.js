/**
 *
 * UserProfileScreen
 *
 */

import React from 'react';
import { Icon, Input, Button, Spinner } from 'native-base';
import {
    ScrollView,
    TouchableOpacity,
    View,
    Switch,
    Image,
    BackHandler,
    ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { deleteSchema } from 'utils/realmStorage';

import { ImageHolder } from 'components/ImageLink/index';
import LoadingScreen from 'components/LoadingScreen/index';
import { HermoText } from 'style/HerComponent';
import { globalScope } from 'hermo/globalScope';
import { dataChecking, getFullScreenWidth } from 'utils/hermoUtils';
import colorPalette from 'style/colorPalette';
import { CHECK_DOTENV } from 'react-native-dotenv';
import FBSDK from 'react-native-fbsdk';
import HerModal from 'components/HerModal';

import {
    makeSelectUserProfile,
    makeSelectUserProfileLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchUserProfile, clearUserProfile, updateRealm } from './actions';
import { makeSelectCommonData } from '../SplashScreen/selectors';

const DeviceInfo = require('react-native-device-info');

export class UserProfileScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    state = {
        debuggerMode: globalScope.debuggerMode,
        viewId: '',
        signOutModalVisible: false,
        loading: false,
    }

    componentDidMount() {
        if (globalScope.token) {
            this.props.dispatch(fetchUserProfile());
        }
    }

    onNavigatorEvent(event) {
        switch (event.id) {
            case 'willAppear':
                this.setState({ signOutModalVisible: false });
                this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
                if (!this.props.profile && globalScope.token) {
                    this.props.dispatch(fetchUserProfile());
                }
                break;
            case 'willDisappear':
                this.backPressed = 0;
                this.backHandler.remove();
                break;
            default:
                return null;
        }

        return true;
    }

    getUserMemberInfo = () => {
        const divider = <View style={styles.divider} />;
        const { profile } = this.props;

        return (
            <View style={{ backgroundColor: 'white' }} >
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.screenOnPressed('Member', 'MEMBER INFO')}>
                    <View style={{ backgroundColor: colorPalette.TyrianPurple, height: 52 }}>
                        <HermoText style={{ color: colorPalette.White, paddingTop: 21, paddingLeft: 20 }}>
                            Welcome Back
                        </HermoText>
                    </View>
                    {/* <ImageHolder imageStyle={{ height: 80, width: getFullScreenWidth() }} imageSource="https://cdn5.hermo.my/images/banners/mufe-buy-2-get-rm44-cash-rebate_1150x450_1522759277.jpg" /> */}
                </TouchableOpacity>

                <View style={styles.userInfoContainer} >
                    <ImageHolder imageStyle={{ marginTop: -25, marginBottom: 10, borderRadius: 25, height: 50, width: 50, alignSelf: 'center' }} imageSource={dataChecking(profile, 'avatar') ? profile.avatar : 'https://www.hermo.sg/images/fb/hermo-logo.png'} />
                    <View style={styles.relative}>
                        <HermoText fontType="BodyTitle" color="black" style={{ textAlign: 'center', fontSize: 17 }}>{dataChecking(profile, 'name')}</HermoText>
                        <View style={{ position: 'absolute', right: 10 }} >
                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.screenOnPressed('UpdateUserProfile', 'EDIT')}>
                                <Icon name="md-create" style={styles.iconEditProfile} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <HermoText
                        style={{
                            height: 20,
                            textAlign: 'center',
                            fontSize: 11,
                        }}
                        color="black"
                        fontType="body"
                    >
                        {dataChecking(profile, 'email')}
                    </HermoText>
                </View>


                <View style={[styles.row, { alignSelf: 'center' }]}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.screenOnPressed('Credits', 'CREDITS')}>
                        <View style={styles.walletContainer}>
                            <HermoText
                                style={{
                                    height: 20,
                                    textAlign: 'center',
                                    fontSize: 17,
                                }}
                                color="black"
                                fontType="bodyTitle"
                            >
                                {dataChecking(profile, 'credit', 'total')}
                            </HermoText>
                            <HermoText
                                style={{
                                    textAlign: 'center',
                                    height: 20,
                                    fontSize: 11,
                                    paddingTop: 5,
                                }}
                                color="black"
                                fontType="label"
                            >
                                CREDITS <Icon name="ios-arrow-forward" style={styles.iconForward} />
                            </HermoText>
                        </View>
                    </TouchableOpacity>

                    {divider}

                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.screenOnPressed('Balance', 'BALANCE')}>
                        <View style={styles.walletContainer}>
                            <HermoText
                                style={{
                                    height: 20,
                                    textAlign: 'center',
                                    fontSize: 17,
                                }}
                                color="black"
                                fontType="bodyTitle"
                            >
                                {dataChecking(profile, 'balance', 'total')}
                            </HermoText>
                            <HermoText
                                style={{
                                    height: 20,
                                    textAlign: 'center',
                                    fontSize: 11,
                                    paddingTop: 5,
                                }}
                                color="black"
                                fontType="label"
                            >
                                BALANCE <Icon name="ios-arrow-forward" style={styles.iconForward} />
                            </HermoText>
                        </View>
                    </TouchableOpacity>

                    {divider}

                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.screenOnPressed('Vouchers', 'VOUCHERS')}>
                        <View style={styles.walletContainer}>
                            <HermoText
                                style={{
                                    height: 20,
                                    textAlign: 'center',
                                    fontSize: 17,
                                }}
                                color="black"
                                fontType="bodyTitle"
                            >
                                {dataChecking(profile, 'voucher', 'usable')}
                            </HermoText>
                            <HermoText
                                style={{
                                    height: 20,
                                    textAlign: 'center',
                                    fontSize: 11,
                                    paddingTop: 5,
                                }}
                                color="black"
                                fontType="label"
                            >
                                VOUCHERS <Icon name="ios-arrow-forward" style={styles.iconForward} />
                            </HermoText>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        );
    };

    getUserSkinInfo = () => {
        const { profile } = this.props;

        return (
            <View style={{ marginTop: 5, padding: 20, backgroundColor: colorPalette.White }}>
                <View style={styles.row}>

                    <HermoText
                        style={{
                            height: 20,
                            fontSize: 14,
                        }}
                        color="black"
                        fontType="BodyTitle"
                    >
                        Skin Tone
                    </HermoText>
                    <View style={{ position: 'absolute', right: 0 }} >
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.screenOnPressed('UserSkinProfile', 'EDIT')}>
                            <Icon name="md-create" style={styles.iconEditProfile} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.row}>

                    <ImageHolder imageStyle={{ margin: 10, borderRadius: 20, height: 40, width: 40 }} imageSource="https://www.hermo.sg/images/fb/hermo-logo.png" />

                    <HermoText
                        style={{
                            marginLeft: 5,
                            marginTop: 25,
                            marginBottom: 25,
                            fontSize: 14,
                            height: 20,
                            textAlign: 'center',
                        }}
                        color="black"
                        fontType="bodyTitle"
                    >
                        {dataChecking(profile, 'skin', 'tone', 'name')}
                    </HermoText>
                </View>

                <HermoText
                    style={{
                        height: 20,
                        fontSize: 14,
                    }}
                    color="black"
                    fontType="BodyTitle"
                >
                    Skin Type
                </HermoText>
                <View style={styles.row}>

                    <ImageHolder imageStyle={{ margin: 10, borderRadius: 20, height: 40, width: 40 }} imageSource="https://www.hermo.sg/images/fb/hermo-logo.png" />
                    <HermoText
                        style={{
                            marginLeft: 5,
                            marginTop: 25,
                            marginBottom: 25,
                            fontSize: 14,
                            height: 20,
                            textAlign: 'center',
                        }}
                        color="black"
                        fontType="bodyTitle"
                    >
                        {dataChecking(profile, 'skin', 'type', 'name')}
                    </HermoText>
                </View>

                <HermoText
                    style={{
                        height: 20,
                        fontSize: 14,
                    }}
                    color="black"
                    fontType="BodyTitle"
                >
                    Skin Concerns
                </HermoText>
                <ScrollView>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                        {
                            profile.skin.concerns && (profile.skin.concerns.size !== 0) ?
                                profile.skin.concerns.map((concern, index) => (
                                    <View style={{ marginTop: 13 }} key={index}>
                                        <View style={{ marginRight: 5, borderColor: colorPalette.LightWhite, borderWidth: 1, borderRadius: 5, backgroundColor: colorPalette.LightWhite }}>
                                            <HermoText
                                                style={{
                                                    paddingTop: 9,
                                                    paddingBottom: 9,
                                                    paddingLeft: 12,
                                                    paddingRight: 12,
                                                    fontSize: 11,
                                                    textAlign: 'center',
                                                }}
                                                color="Black"
                                                fontType="BodyTitle"
                                            >
                                                {concern.name}
                                            </HermoText>
                                        </View>
                                    </View>
                                )) :
                                null
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }

    getUserSetting = () => (
        <View style={styles.rowDivider}>
            <HermoText
                style={{
                    fontSize: 14,
                    fontWeight: '700',
                    marginLeft: 20,
                    marginBottom: 8,
                    marginTop: 24,
                }}
                color="black"
                fontType="bodyTitle"
            >
                User Settings
            </HermoText>
        </View>
    )

    getHelpSetting = () => (
        <View style={styles.rowDivider}>
            <HermoText
                style={{
                    fontSize: 14,
                    fontWeight: '700',
                    marginLeft: 12,
                    marginBottom: 8,
                    marginTop: 24,
                }}
                color="black"
                fontType="bodyTitle"
            >
                Need Help?
            </HermoText>
        </View>
    )

    getContent = () => {
        const { profile } = this.props;
        return (
            <ScrollView>
                {
                    profile ?
                        <View>
                            {this.getUserMemberInfo()}
                            {this.getUserSkinInfo()}
                            {this.getUserSetting()}
                        </View>
                        :
                        <View style={{ backgroundColor: colorPalette.White }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                {/* <ImageHolder imageStyle={{ height: getFullScreenWidth(), width: getFullScreenWidth() }} imageSource="https://www.hermo.sg/images/fb/hermo-logo.png" /> */}
                                <Image style={{ width: 153, height: 130 }} source={require('../../Resources/newAccount.png')} />
                            </View>
                            <HermoText
                                style={{
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    backgroundColor: colorPalette.Transparent,
                                }}
                                color="Black"
                                fontType="body"
                            >
                                {'View your orders and wishlists\n anytime, anywhere.'}
                            </HermoText>
                            <View style={{ padding: 21 }}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: colorPalette.TyrianPurple, margin: 5, padding: 10 }]}
                                    activeOpacity={0.75}
                                    onPress={() => this.screenOnPressed('Login', 'LOGIN')}
                                >
                                    <HermoText style={{ textAlign: 'center', fontSize: 14 }} color="white" fontType="button" >LOG IN</HermoText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, { margin: 5, padding: 10 }]}
                                    activeOpacity={0.75}
                                    onPress={() => this.screenOnPressed('SignUp', 'SIGN UP')}
                                >
                                    <HermoText style={{ textAlign: 'center', fontSize: 14 }} color="black" fontType="button" >SIGN UP</HermoText>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginBottom: 5 }} />
                        </View>
                }

                {this.getHelpSetting()}

                <View style={styles.rowDivider}>
                    <HermoText fontType="BodyTitle" color="Black" style={{ margin: 10, marginLeft: 25 }}>{`V${DeviceInfo.getVersion()}`}</HermoText>
                </View>
                {
                    profile ?
                        <View style={{ ...styles.rowDivider, marginBottom: 20 }}>
                            <TouchableOpacity onPress={this.openModal} style={{ position: 'relative' }}>
                                <HermoText
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        textAlign: 'center',
                                        margin: 15,
                                    }}
                                    color="TyrianPurple"
                                    fontType="body"
                                >
                                    Sign out
                                </HermoText>
                                <View style={{ height: 30, width: 30, paddingTop: 16, position: 'absolute', right: 130 }}>
                                    <Icon name="ios-log-out-outline" style={{ paddingLeft: 11, fontSize: 15, color: colorPalette.TyrianPurple }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
                {
                    globalScope.isAdmin ?
                        <View style={{ padding: 15, ...styles.rowDivider }}>
                            <HermoText fontType="Title" color="Black">Developer Options:</HermoText>
                            <HermoText fontType="Label" color="Black">{`env: ${CHECK_DOTENV}`}</HermoText>
                            <HermoText fontType="Label" color="Black">{`API: ${globalScope.api}`}</HermoText>
                            <View style={[styles.row, { padding: 10 }]}>
                                <View style={{ flex: 5 }}>
                                    <HermoText fontType="BodyTitle" color="Black">Debugger Mode:</HermoText>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Switch
                                        value={this.state.debuggerMode}
                                        onValueChange={(newValue) => {
                                            this.setState({ debuggerMode: newValue });
                                            globalScope.debuggerMode = newValue;
                                            this.props.dispatch(updateRealm({
                                                realmKey: 'Auth',
                                                schemaObj: {
                                                    token: globalScope.token,
                                                    isAdmin: globalScope.isAdmin,
                                                    debuggerMode: newValue,
                                                },
                                            }));
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={[styles.row, { padding: 10 }]}>

                                <View style={{ flex: 1 }}>
                                    <Button
                                        style={{
                                            backgroundColor: '#F2F2F2',
                                        }}
                                        onPress={() => {
                                            if (this.state.viewId && !Number.isNaN(this.state.viewId)) {
                                                this.props.navigator.push({
                                                    screen: 'hermorn.screen.CampaignViewer',
                                                    animated: true,
                                                    backButtonTitle: '',
                                                    passProps: {
                                                        data: {
                                                            id: this.state.viewId,
                                                        },
                                                    },
                                                });
                                            }
                                        }}
                                    >
                                        <HermoText
                                            style={{
                                                padding: 10,
                                                color: 'gray',
                                            }}
                                            color="gray"
                                            fontType="body"
                                        >
                                            Go
                                        </HermoText>
                                    </Button>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Input
                                        style={{ marginRight: 10, fontSize: 10, color: colorPalette.Grey }}
                                        value={this.state.viewId}
                                        onChangeText={(newValue) => this.setState({ viewId: newValue })}
                                    />
                                </View>
                            </View>
                        </View>
                        :
                        null
                }
            </ScrollView>
        );
    };

    handleBackPress = () => {
        if (this.backPressed && this.backPressed > 0) {
            this.props.navigator.popToRoot({ animated: false });
            return false;
        }

        this.backPressed = 1;
        ToastAndroid.show('Press one more time to exit', ToastAndroid.SHORT);
        return true;
    }

    refreshFunction = () => {
        this.props.dispatch(fetchUserProfile());
    }

    screenOnPressed = (page, title) => {
        const {
            profile,
            commonData,
        } = this.props;

        switch (page) {
            case 'Member': // hermorn.screen.Member
            case 'UpdateUserProfile': // hermorn.screen.UpdateUserProfile
            case 'OrderList': // hermorn.screen.OrderList
            case 'ResetPassword': // hermorn.screen.ResetPassword
            case 'AddressBook': // hermorn.screen.AddressBook
                this.props.navigator.push({
                    screen: `hermorn.screen.${page}`,
                    animated: true,
                    backButtonTitle: '',
                    title: title || page,
                    navigatorStyle: { tabBarHidden: true },
                    passProps: {
                        userProfile: profile,
                        refreshFunction: this.refreshFunction,
                        commonConfig: dataChecking(commonData, 'config'),
                    },
                });
                break;
            case 'Feedback': // hermorn.screen.Feedback
                this.props.navigator.showModal({
                    screen: `hermorn.screen.${page}`,
                    animated: true,
                    backButtonTitle: '',
                    title: title || page,
                    navigatorStyle: { tabBarHidden: true },
                    passProps: {
                        userProfile: profile,
                    },
                });
                break;
            case 'FAQ': // hermorn.screen.FAQ
            case 'AboutHermo': // hermorn.screen.AboutHermo
            case 'ContactUs': // hermorn.screen.ContactUs
                this.props.navigator.showModal({
                    screen: `hermorn.screen.${page}`,
                    animated: true,
                    backButtonTitle: '',
                    title: title || page,
                    navigatorStyle: { tabBarHidden: true },
                    passProps: {
                        commonConfig: dataChecking(commonData, 'config'),
                        userProfile: profile,
                    },
                });
                break;
            case 'JoinUs': // hermorn.screen.JoinUs
            case 'PrivacyPolicy': // hermorn.screen.PrivacyPolicy
                this.props.navigator.showModal({
                    screen: `hermorn.screen.${page}`,
                    animated: true,
                    backButtonTitle: '',
                    title: title || page,
                    navigatorStyle: { tabBarHidden: true },
                });
                break;
            case 'WishList':
                this.props.navigator.push({
                    screen: 'hermorn.screen.WishList',
                    animated: true,
                    backButtonTitle: '',
                    title: title || page,
                    navigatorStyle: { tabBarHidden: true },
                    passProps: {
                        dispatch: this.props.dispatch,
                    },
                });
                break;
            case 'Login':
            case 'SignUp':
                this.props.navigator.showModal({
                    screen: `hermorn.screen.${page}`,
                    title: title || page,
                    animationType: 'slide-up',
                    passProps: {
                        onCloseModal: () => {
                            this.setState({ loading: false, signOutModalVisible: false });
                            if (!this.props.profile && globalScope.token) {
                                this.props.dispatch(fetchUserProfile());
                            }
                        },
                    },
                });
                break;
            case 'Credits':
            case 'Balance':
            case 'Vouchers':
                this.props.navigator.push({
                    screen: 'hermorn.screen.Wallet',
                    animated: true,
                    backButtonTitle: '',
                    title: title || page,
                    passProps: {
                        data: page,
                        userProfile: profile,
                    },
                });
                break;
            case 'UserSkinProfile':
                this.props.navigator.push({
                    screen: 'hermorn.screen.UserSkinProfile',
                    animated: true,
                    backButtonTitle: '',
                    title: title || page,
                    passProps: {
                        userProfile: profile,
                        skinToneList: dataChecking(commonData, 'skin_tone', 'items'),
                        skinTypeList: dataChecking(commonData, 'skin_type', 'items'),
                        skinConcernList: dataChecking(commonData, 'skin_concern', 'items'),
                        refreshFunction: this.refreshFunction,
                    },
                });
                break;
            case 'AboutPayment':
                this.props.navigator.showModal({
                    screen: 'hermorn.screen.AboutPayment',
                    animated: true,
                    backButtonTitle: '',
                    title: title || page,
                    passProps: {
                        commonConfig: dataChecking(commonData),
                    },
                });
                break;
            case 'SignOut':
                deleteSchema('Auth');
                globalScope.token = '';
                globalScope.isAdmin = false;
                globalScope.debuggerMode = false;
                this.props.dispatch(clearUserProfile());

                FBSDK.LoginManager.logOut();

                this.props.navigator.showModal({
                    screen: 'hermorn.screen.Login',
                    title: 'LOGIN',
                    animationType: 'slide-up',
                    passProps: {
                        onCloseModal: () => {
                            this.setState({ loading: false, signOutModalVisible: false });
                            if (!this.props.profile && globalScope.token) {
                                this.props.dispatch(fetchUserProfile());
                            }
                        },
                    },
                });
                break;
            default:
                return null;
        }
        return null;
    };

    openModal = () => {
        this.setState({ signOutModalVisible: true });
    }

    renderSignOutModal = () => (
        <HerModal
            isHerModalVisible={this.state.signOutModalVisible}
            content={
                this.state.loading ?
                    <View style={{ padding: 10 }}>
                        <Spinner color="#9a9a9a" />
                    </View>
                    :
                    <View style={{ padding: 10 }}>
                        <View style={{ alignItems: 'center', marginBottom: 10 }}>
                            <HermoText>Are you sure you want sign out ?</HermoText>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.setState({ signOutModalVisible: false })}>
                                    <HermoText style={{ color: colorPalette.TyrianPurple }}>Cancel</HermoText>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            this.setState({ loading: true });
                                            setTimeout(() => this.screenOnPressed('SignOut', 'SIGN OUT'), 2000);
                                        }
                                    }
                                >
                                    <HermoText style={{ color: colorPalette.TyrianPurple }}>Confirm</HermoText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            }
        />
    );

    render() {
        const { loading } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {
                    loading === false ?
                        this.getContent()
                        :
                        <LoadingScreen visible={true} />
                }
                {this.renderSignOutModal()}
            </View>
        );
    }
}

const styles = {
    row: {
        flexDirection: 'row',
    },
    divider: {
        marginTop: 30,
        width: 1,
        height: 20,
        backgroundColor: colorPalette.Grey,
    },
    userInfoContainer: {
        alignSelf: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: getFullScreenWidth(),
    },
    iconEditProfile: {
        marginLeft: 30,
        fontSize: 19,
        paddingLeft: 5,
        paddingRight: 5,
        color: colorPalette.Grey,
    },
    walletContainer: {
        flexDirection: 'column',
        margin: 10,
        marginTop: 20,
        marginBottom: 20,
        width: (getFullScreenWidth() / 3) - 20,
    },
    iconForward: {
        fontSize: 12,
        color: colorPalette.Sliver,
    },
    walletTitle: {
        fontSize: 19,
        fontWeight: '600',
        height: 20,
        textAlign: 'center',
    },
    walletSubtitle: {
        fontSize: 12,
        height: 20,
        textAlign: 'center',
        color: colorPalette.Sliver,
    },
    rowDivider: {
        marginTop: 5,
        backgroundColor: 'white',
    },
    button: {
        borderWidth: 1,
        borderColor: colorPalette.TyrianPurple,
        marginBottom: 10,
        borderRadius: 5,
    },
    relative: {
        position: 'relative',
    },
};
UserProfileScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    profile: PropTypes.object,
    commonData: PropTypes.object,

};

const mapStateToProps = createStructuredSelector({
    loading: makeSelectUserProfileLoading(),
    profile: makeSelectUserProfile(),
    commonData: makeSelectCommonData(),

});


export function mapDispatchToProps(dispatch) {
    return { dispatch };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userProfileScreen', reducer });
const withSaga = injectSaga({ key: 'userProfileScreen', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(UserProfileScreen);
