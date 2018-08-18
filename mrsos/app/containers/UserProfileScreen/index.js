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
                <View style={{ backgroundColor: colorPalette.TyrianPurple, height: 52 }}>
                    <HermoText style={{ color: colorPalette.White, paddingTop: 21, paddingLeft: 20 }}>
                        Welcome Back
                    </HermoText>
                </View>

                <View style={styles.userInfoContainer} >
                    <ImageHolder imageStyle={{ marginTop: -25, marginBottom: 10, borderRadius: 25, height: 50, width: 50, alignSelf: 'center' }} imageSource={dataChecking(profile, 'avatar') ? profile.avatar : 'https://www.hermo.sg/images/fb/hermo-logo.png'} />
                    <View style={styles.relative}>
                        <HermoText fontType="BodyTitle" color="black" style={{ textAlign: 'center', fontSize: 17 }}>{dataChecking(profile, 'name')}</HermoText>
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
            </View>
        );
    };

    getUserSkinInfo = () => {
        const { profile } = this.props;

        return (
            <View style={{ marginTop: 5, padding: 20, backgroundColor: colorPalette.White }}>
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
        switch (page) {
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
            case 'SignOut':
                deleteSchema('Auth');
                globalScope.token = '';
                globalScope.isAdmin = false;
                globalScope.debuggerMode = false;
                this.props.dispatch(clearUserProfile());

                FBSDK.LoginManager.logOut();

                this.props.navigator.showModal({
                    screen: 'hermorn.screen.SignUp',
                    title: 'Sign In',
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
