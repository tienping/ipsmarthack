/**
 *
 * LoginScreen
 *
 */

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, BackHandler, ToastAndroid } from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Button,
    Icon,
    Spinner,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Modal from 'react-native-modal';
import { goToLanding } from 'hermo/HermornScreens';
import LoadingScreen from 'components/LoadingScreen';
import { dataChecking, transfromViewHeightBasedOnPercentage } from 'utils/hermoUtils';
import FBSDK from 'react-native-fbsdk';

import { HermoText } from 'style/HerComponent';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import colorPalette from 'style/colorPalette';
import makeSelectLoginScreen, {
    makeSelectLoginScreenForget,
    makeSelectLoginScreenForgetError,
    makeSelectLoginScreenForgetLoading,
    makeSelectLoginScreenLoading,
    makeSelectLoginError,
    makeSelectLoginScreenAuth,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
    login,
    loginFB,
    forgetRequest,
    resetMessage,
} from './actions';

const {
    LoginButton,
    AccessToken,
} = FBSDK;


const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },
    logo: {
        height: 180,
        width: 180,
    },
    formContainer: {
        marginTop: 36.5,
        marginLeft: 20,
        marginRight: 20,
    },
    image: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: -20,
        left: -30,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
});

export const getFbUserProfileData = (token, dispatch) => {
    fetch(`https://graph.facebook.com/v2.7/me?fields=email,name,friends&access_token=${token}`)
        .then((response) => response.json())
        .then((json) => {
            dispatch(loginFB(json.id, token, json.email));
        })
        .catch(() => {
            reject('ERROR GETTING DATA FROM FACEBOOK');
        });
};

export class LoginScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static navigatorStyle = {
        tabBarHidden: true,
    }

    static navigatorButtons = {
        rightButtons: [
            {
                icon: require('hermo/Resources/ic-close.png'),
                id: 'close',
            },
        ],
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    state = {
        isModalVisible: false,
        username: '',
        password: '',
        email: '',
        emailErrText: '',
        pwsErrText: '',
        emailError: false,
        pwsError: false,
        errInfo: [],
        passwordHide: true,
        showForgetPasswordSuccss: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth && nextProps.auth !== this.props.auth) {
            goToLanding(this.props.navigator, this);
        }

        if (nextProps.loginError !== this.props.loginError) {
            if (!nextProps.loginLoading && nextProps.loginError !== null) {
                const err = [];

                if (nextProps.loginError && nextProps.loginError.messages && nextProps.loginError.messages.length > 0) {
                    nextProps.loginError.messages.map((item) => (err.push(item.text)));
                    this.setState({ errInfo: err });
                }
            }
        }

        if (nextProps.forget !== this.props.forget) {
            if (dataChecking(nextProps, 'forget', 'messages')) {
                for (let i = 0, len = nextProps.forget.messages.length; i < len; i++) {
                    const msg = nextProps.forget.messages[i];
                    if (msg.type !== 'error') {
                        // this.setState({ isModalVisible: false });
                        // HerToast.show({
                        //     text: dataChecking(msg, 'text'),
                        //     type: msg.type === 'error' ? 'danger' : 'success',
                        //     duration: 5000,
                        //     navigator: this.props.navigator,
                        // });
                        this.setState({ showForgetPasswordSuccss: true });
                    }
                }
            }
        }
    }

    onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress' && event.id === 'close') {
            if (this.props.onCloseModal) {
                this.props.onCloseModal();
            }
            this.props.navigator.dismissModal();
        } else if (event.id === 'willAppear') {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        } else if (event.id === 'willDisappear') {
            this.backPressed = 0;
            this.backHandler.remove();
        }
    }

    onLoginHandler = () => {
        const { username, password } = this.state;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (username === '' || password === '') {
            if (username === '') {
                this.setState({ emailError: true });
                this.setState({ emailErrText: 'Please enter email address.' });
            } else {
                this.setState({ emailError: false });
                this.setState({ emailErrText: '' });
            }
            if (password === '') {
                this.setState({ pwsError: true });
                this.setState({ pwsErrText: 'Please enter password.' });
            } else {
                this.setState({ pwsError: false });
                this.setState({ pwsErrText: '' });
            }
        } else if (!reg.test(username)) {
            this.setState({ emailError: true });
            this.setState({ emailErrText: 'Please enter valid email address.' });
        } else {
            this.props.dispatch(login(username, password));
        }
    };

    onSignUpHandler = () => {
        this.props.navigator.push({
            screen: 'hermorn.screen.SignUp',
            backButtonTitle: '',
            animated: true,
            title: 'SIGN UP',
        });
    };

    onForgetPassHandler = () => {
        this.setState({ showForgetPasswordSuccss: false });
        this.setState({ isModalVisible: true });
    }

    onRequestForgetPassword = () => {
        const { email } = this.state;
        this.props.dispatch(forgetRequest(email));
    }

    onTextChange = (type, value) => {
        switch (type) {
            case 'email': this.setState({ username: value, emailError: false, errInfo: [] });
                break;
            case 'password': this.setState({ password: value, pwsError: false, errInfo: [] });
                break;
            default:
                break;
        }
    }

    cancelForgetPassword = () => {
        this.setState({ isModalVisible: false, email: '' });
        this.props.dispatch(resetMessage());
    }

    handleBackPress = () => {
        if (this.backPressed && this.backPressed > 0) {
            this.props.navigator.popToRoot({ animated: false });
            return false;
        }

        this.backPressed = 1;
        ToastAndroid.show('Press one more time to exit', ToastAndroid.SHORT);
        return true;
    }

    togglePasswordHideAndShow = () => {
        this.setState({ passwordHide: !this.state.passwordHide });
    }

    togglePasswordHideAndShow = () => {
        this.setState({ passwordHide: !this.state.passwordHide });
    }

    renderForgetPasswordRequest = () => (
        <View
            style={{
                padding: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignSelf: 'center',
            }}
        >
            <Text
                style={{
                    padding: 5,
                    textAlign: 'center',
                    fontSize: 15,
                    color: 'black',
                    fontWeight: '600',
                }}
            >
                Forget Password
            </Text>
            <Text
                style={{
                    padding: 5,
                    textAlign: 'center',
                    fontSize: 15,
                    color: 'black',
                }}
            >
                Please fill in your registered email  address.
            </Text>
            <Form
                style={{ padding: 5 }}
            >
                <Item style={{ marginLeft: 0 }}>
                    <Icon name="mail" />
                    <Input
                        style={{ fontSize: 15, color: 'gray' }}
                        placeholder="Email Address*"
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                    />
                </Item>
            </Form>
            <View
                style={{ flexDirection: 'row' }}
            >
                <Text
                    style={{
                        padding: 5,
                        textAlign: 'center',
                        flex: 1,
                    }}
                    onPress={() => this.cancelForgetPassword()}
                >Cancel
                </Text>
                <Text
                    onPress={() => this.onRequestForgetPassword()}
                    style={{
                        padding: 5,
                        textAlign: 'center',
                        flex: 1,
                    }}
                >
                    Ok
                </Text>
            </View>
            <View
                style={{
                    height: transfromViewHeightBasedOnPercentage(10, 100, 0.8),
                    justifyContent: 'center',
                    padding: 5,
                }}
            >
                {
                    this.props.forgetLoading ? <LoadingScreen visible={true} /> : <Text>{dataChecking(this.props.forget, 'messages') ? this.props.forget.messages[0].text : ''}</Text>
                }
            </View>
        </View>
    )

    renderForgetPasswordSuccess = () => (
        <View
            style={{
                padding: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignSelf: 'center',
            }}
        >
            <Text
                style={{
                    padding: 5,
                    textAlign: 'center',
                    fontSize: 15,
                    color: 'black',
                    fontWeight: '600',
                }}
            >
                Forget Password
            </Text>
            <View
                style={{
                    height: transfromViewHeightBasedOnPercentage(10, 100, 0.8),
                    justifyContent: 'center',
                    padding: 5,
                }}
            >
                {
                    this.props.forgetLoading ? <LoadingScreen visible={true} /> : <Text style={{ color: colorPalette.Emerald }}>{dataChecking(this.props.forget, 'messages') ? this.props.forget.messages[0].text : ''}</Text>
                }
            </View>
            <View
                style={{ flexDirection: 'row' }}
            >
                <Text
                    onPress={() => this.setState({ isModalVisible: false })}
                    style={{
                        padding: 5,
                        textAlign: 'center',
                        flex: 1,
                    }}
                >
                    Ok
                </Text>
            </View>
        </View>
    )

    renderContent() {
        return (
            <Container style={{ backgroundColor: 'white' }} >
                <Content>
                    <View style={styles.logoContainer}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>LOGIN WITH</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 20 }}>
                            <LoginButton
                                onLoginFinished={
                                    (error, result) => {
                                        if (error) {
                                            alert('login has error: ' + result.error);
                                        } else {
                                            AccessToken.getCurrentAccessToken().then((data) => {
                                                getFbUserProfileData(data.accessToken, this.props.dispatch);
                                            });
                                        }
                                    }
                                }
                            />
                        </View>
                        <View style={{ borderBottomColor: '#bdbdbd', borderBottomWidth: 1, width: '90%' }} />
                        <View style={{ position: 'relative' }}>
                            <Text
                                style={styles.image}
                            >
                                OR
                            </Text>
                        </View>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={{ marginBottom: 29 }}>
                            <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>YOUR EMAIL ACCOUNT</Text>
                        </View>
                        <Form>
                            <View style={{ borderColor: this.state.emailError ? 'red' : null, borderWidth: this.state.emailError ? 1 : 0 }}>
                                <Item error={this.state.emailError} style={{ marginLeft: 0 }}>
                                    <Image style={{ marginLeft: 10, width: 16, height: 12 }} source={require('../../Resources/email.png')} />
                                    <Input
                                        style={{ fontSize: 10, color: 'gray', marginLeft: 5 }}
                                        placeholder="Email Address*"
                                        value={this.state.username}
                                        onChangeText={(username) => this.onTextChange('email', username)}
                                    />
                                </Item>
                            </View>
                            {
                                this.state.emailError ?
                                    <View style={{ backgroundColor: 'red', flexDirection: 'row', paddingLeft: 10 }}>
                                        <Icon name="information-circle" style={{ color: 'white', fontSize: 16, alignSelf: 'center' }} />
                                        <HermoText color="WhiteSmoke" style={{ textAlign: 'center', padding: 2 }}>{this.state.emailErrText}</HermoText>
                                    </View> : null
                            }

                            <View style={{ borderColor: this.state.pwsError ? 'red' : null, borderWidth: this.state.pwsError ? 1 : 0, marginTop: 10 }}>
                                <Item error={this.state.pwsError} style={{ marginLeft: 0, display: 'flex', flexDirection: 'row' }}>
                                    <Image style={{ marginLeft: 10, width: 16, height: 16 }} source={require('../../Resources/pass.png')} />
                                    <Input
                                        style={{ fontSize: 15, color: 'gray', marginLeft: 5, flex: 8 }}
                                        placeholder="Password*"
                                        secureTextEntry={this.state.passwordHide}
                                        value={this.state.password}
                                        onChangeText={(password) => this.onTextChange('password', password)}
                                    />
                                    <TouchableOpacity onPress={() => this.togglePasswordHideAndShow()}>
                                        {
                                            this.state.passwordHide ?
                                                <Image style={{ width: 18, height: 16 }} source={require('../../Resources/seepass.png')} />
                                                :
                                                <Image style={{ width: 18, height: 16 }} source={require('../../Resources/seepass.png')} />
                                        }
                                    </TouchableOpacity>
                                </Item>
                            </View>
                            {
                                this.state.pwsError ?
                                    <View style={{ backgroundColor: 'red', flexDirection: 'row', paddingLeft: 10 }}>
                                        <Icon name="information-circle" style={{ color: 'white', fontSize: 16, alignSelf: 'center' }} />
                                        <HermoText color="WhiteSmoke" style={{ textAlign: 'center', padding: 2 }}>{this.state.pwsErrText}</HermoText>
                                    </View> : null
                            }
                        </Form>
                        {
                            this.state.errInfo ?
                                this.state.errInfo.map((msg, index) => (
                                    <HermoText color="Red" style={{ textAlign: 'center', marginTop: 20 }} key={index} >{msg}</HermoText>
                                )) : null
                        }
                        <Button
                            style={{
                                marginTop: 19,
                                backgroundColor: this.state.username && this.state.password && !this.state.emailError && !this.state.pwsError ?
                                    colorPalette.TyrianPurple : colorPalette.LightSilver,
                            }}
                            block={true}
                            onPress={this.onLoginHandler}
                        >
                            {
                                this.props.loginLoading ?
                                    <Spinner color="white" /> :
                                    <Text style={{ textAlign: 'center', alignSelf: 'center', color: 'white', fontSize: 14 }}>LOGIN</Text>
                            }
                        </Button>
                        <Text onPress={this.onForgetPassHandler} style={{ alignSelf: 'center', marginTop: 30, color: 'rgb(123,123,123)', fontSize: 14 }}>Forgot Password? >></Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                width: '100%',
                                paddingTop: 19.5,
                            }}
                        />
                        <View style={{ alignSelf: 'center', marginTop: 10, marginBottom: 40 }}>
                            <Button
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: 'gray',
                                    borderRadius: 2,
                                }}
                                block={true}
                                onPress={this.onSignUpHandler}
                            >
                                <Text style={{ textAlign: 'center', width: 100, color: 'rgb(102, 0, 51)', fontSize: 14, marginTop: 15, marginBottom: 15, marginLeft: 30, marginRight: 30 }}>Login with Phone Number</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
                <Modal isVisible={this.state.isModalVisible}>
                    {
                        this.state.showForgetPasswordSuccss ? this.renderForgetPasswordSuccess() : this.renderForgetPasswordRequest()
                    }
                </Modal>
            </Container>
        );
    }

    renderLoading() {
        return (
            <View>
                <Spinner color="#9a9a9a" />
            </View>
        );
    }

    render() {
        return (
            <Container>
                {
                    !this.props.loginLoading ? this.renderContent() : this.renderLoading()
                }
            </Container>
        );
    }
}

LoginScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    loginscreen: makeSelectLoginScreen(),
    loginLoading: makeSelectLoginScreenLoading(),
    loginError: makeSelectLoginError(),
    forget: makeSelectLoginScreenForget(),
    forgetLoading: makeSelectLoginScreenForgetLoading(),
    forgetError: makeSelectLoginScreenForgetError(),
    auth: makeSelectLoginScreenAuth(),
});

export function mapDispatchToProps(dispatch) {
    return { dispatch };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginScreen', reducer });
const withSaga = injectSaga({ key: 'loginScreen', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(LoginScreen);
