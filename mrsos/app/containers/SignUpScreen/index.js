/**
 *
 * SignUpScreen
 *
 */

import React from 'react';
import { View, Image, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Button,
    Text,
    Icon,
    Spinner,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getXdp, getYdp } from 'utils/hermoUtils';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { goToLanding } from 'hermo/HermornScreens';
import { HermoText } from 'style/HerComponent';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectSignUpScreen, { makeSelectSignUpScreenAuth } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signUpRequest } from './actions';

const styles = {
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
        marginTop: 29,
        marginLeft: getXdp(5),
        marginRight: getXdp(5),
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
};

export class SignUpScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static navigatorStyle = {
        tabBarHidden: true,
    }

    static navigatorButtons = {
        rightButtons: [{
            icon: require('hermo/Resources/ic-close.png'),
            id: 'close',
        }],
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    state = {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        usernameErr: false,
        usernameErrText: '',
        emailErr: false,
        emailErrText: '',
        passwordErr: false,
        passwordErrText: '',
        cpasswordErr: false,
        cpasswordErrText: '',
        errInfo: [],
        passwordHide: true,
        cpasswordHide: true,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth && nextProps.auth !== this.props.auth) {
            goToLanding(this.props.navigator, this);
        }

        if (nextProps.signupscreen.error !== this.props.signupscreen.error) {
            if (!nextProps.signupscreen.loading && nextProps.signupscreen.error !== null) {
                const err = [];

                if (nextProps.signupscreen.error && nextProps.signupscreen.error.messages && nextProps.signupscreen.error.messages.length > 0) {
                    nextProps.signupscreen.error.messages.map((item) => (
                        err.push(item.text)
                    ));
                    this.setState({ errInfo: err });
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
        this.props.navigator.push({
            screen: 'hermorn.screen.Login',
            backButtonTitle: '',
            animated: true,
            title: 'LOGIN',
        });
    };

    onSignUpHandler = () => {
        const { username, email, password, password_confirmation } = this.state;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (username === '' || email === '' || password === '' || password_confirmation === '') {
            if (username === '') {
                this.setState({ usernameErr: true });
                this.setState({ usernameErrText: 'Please enter Full Name.' });
            } else {
                this.setState({ usernameErr: false });
                this.setState({ usernameErrText: '' });
            }
            if (email === '') {
                this.setState({ emailErr: true });
                this.setState({ emailErrText: 'Please enter Full Name.' });
            } else {
                this.setState({ emailErr: false });
                this.setState({ emailErrText: '' });
            }
            if (password === '') {
                this.setState({ passwordErr: true });
                this.setState({ passwordErrText: 'Please enter Phone Number.' });
            } else {
                this.setState({ passwordErr: false });
                this.setState({ passwordErrText: '' });
            }
            if (password_confirmation === '') {
                this.setState({ cpasswordErr: true });
                this.setState({ cpasswordErrText: 'Please enter One Time Password.' });
            } else {
                this.setState({ cpasswordErr: false });
                this.setState({ cpasswordErrText: '' });
            }
        } else if (!reg.test(email)) {
            this.setState({ emailErr: true });
            this.setState({ emailErrText: 'Please enter valid email address.' });
        } else if (password_confirmation !== password) {
            this.setState({ cpasswordErr: true });
            this.setState({ cpasswordErrText: 'Password Not Match' });
        } else {
            this.props.dispatch(signUpRequest(email, password, password_confirmation));
        }
    };

    onCloseHandler = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        });
    };

    onTextChange = (type, value) => {
        switch (type) {
            case 'username': this.setState({ username: value, usernameErr: false, errInfo: [] });
                break;
            case 'email': this.setState({ email: value, emailErr: false, errInfo: [] });
                break;
            case 'password': this.setState({ password: value, passwordErr: false, errInfo: [] });
                break;
            case 'cpassword': this.setState({ password_confirmation: value, cpasswordErr: false, errInfo: [] });
                break;
            default:
                break;
        }
    }

    privacyOnPressed = () => {
        this.props.navigator.showModal({
            screen: 'hermorn.screen.PrivacyPolicy',
            animationType: 'slide-up',
            title: 'PRIVACY POLICY',
        });
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

    toggleCPasswordHideAndShow = () => {
        this.setState({ cpasswordHide: !this.state.cpasswordHide });
    }
    toggleCPasswordHideAndShow = () => {
        this.setState({ cpasswordHide: !this.state.cpasswordHide });
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content>
                    <View style={styles.logoContainer}>
                        <View style={{ flexDirection: 'row', paddingTop: 5}}>
                            <Image style={{ height: 48, width: 48, paddingTop: getYdp(10), marginLeft: 17, marginRight: 17 }} source={require('../../Resources/mrsos-logo.png')} />
                        </View>
                        <HermoText fontType="Body">Mr SOS</HermoText>
                        <HermoText style={{ color: '#49525d', paddingTop: getYdp(5), paddingBottom: getYdp(1), fontSize: 30 }}>Sign In</HermoText>
                    </View>
                    <View style={styles.formContainer}>
                        <Form>
                            <View style={{ borderColor: this.state.emailErr ? 'red' : null, borderWidth: this.state.emailErr ? 1 : 0 }}>
                                <Item error={this.state.emailErr} style={{ marginLeft: 0 }}>
                                    <Image style={{ marginLeft: 10, width: 16, height: 16 }} source={require('../../Resources/user.png')} />
                                    <Input
                                        style={{ fontSize: 15, color: 'gray', marginLeft: 5 }}
                                        placeholder="Full Name"
                                        value={this.state.email}
                                        onChangeText={(email) => this.onTextChange('email', email)}
                                    />
                                </Item>
                            </View>
                            {
                                this.state.emailErr ?
                                    <View style={{ backgroundColor: 'red', flexDirection: 'row', paddingLeft: 10 }}>
                                        <Icon name="information-circle" style={{ color: 'white', fontSize: 16, alignSelf: 'center' }} />
                                        <HermoText color="WhiteSmoke" style={{ textAlign: 'center', padding: 2 }}>{this.state.emailErrText}</HermoText>
                                    </View> : null
                            }

                            <View style={{ borderColor: this.state.passwordErr ? 'red' : null, borderWidth: this.state.passwordErr ? 1 : 0, marginTop: 10 }}>
                                <Item error={this.state.passwordErr} style={{ marginLeft: 0, display: 'flex', flexDirection: 'row' }}>
                                    <Image style={{ marginLeft: 10, width: 16, height: 16 }} source={require('../../Resources/phone.png')} />
                                    <Input
                                        style={{ fontSize: 15, color: 'gray', marginLeft: 5, flex: 8 }}
                                        placeholder="Phone Number"
                                        secureTextEntry={this.state.passwordHide}
                                        value={this.state.password}
                                        onChangeText={(password) => this.onTextChange('password', password)}
                                    />
                                </Item>
                            </View>
                            {
                                this.state.passwordErr ?
                                    <View style={{ backgroundColor: 'red', flexDirection: 'row', paddingLeft: 10 }}>
                                        <Icon name="information-circle" style={{ color: 'white', fontSize: 16, alignSelf: 'center' }} />
                                        <HermoText color="WhiteSmoke" style={{ textAlign: 'center', padding: 2 }}>{this.state.passwordErrText}</HermoText>
                                    </View> : null
                            }

                            <View style={{ borderColor: this.state.cpasswordErr ? 'red' : null, borderWidth: this.state.cpasswordErr ? 1 : 0, marginTop: 10 }}>
                                <Item error={this.state.cpasswordErr} style={{ marginLeft: 0, display: 'flex', flexDirection: 'row' }}>
                                    <Image style={{ marginLeft: 10, width: 16, height: 16 }} source={require('../../Resources/pass.png')} />
                                    <Input
                                        style={{ fontSize: 15, color: 'gray', marginLeft: 5, flex: 8 }}
                                        placeholder="OTP"
                                        secureTextEntry={this.state.cpasswordHide}
                                        value={this.state.cpassword}
                                        onChangeText={(cpassword) => this.onTextChange('cpassword', cpassword)}
                                    />
                                    <TouchableOpacity onPress={() => this.toggleCPasswordHideAndShow()}>
                                        <HermoText style={{ borderWidth: 1, borderRadius: 5, marginRight: 10, borderColor: 'rgba(0,0,0,0.2)', padding: 5 }}>Request</HermoText>
                                    </TouchableOpacity>
                                </Item>
                            </View>
                            {
                                this.state.cpasswordErr ?
                                    <View style={{ backgroundColor: 'red', flexDirection: 'row', paddingLeft: 10 }}>
                                        <Icon name="information-circle" style={{ color: 'white', fontSize: 16, alignSelf: 'center' }} />
                                        <HermoText color="WhiteSmoke" style={{ textAlign: 'center', padding: 2 }}>{this.state.cpasswordErrText}</HermoText>
                                    </View> : null
                            }
                        </Form>
                    </View>
                    {
                        this.state.errInfo ?
                            this.state.errInfo.map((msg, index) => (
                                <HermoText color="Red" style={{ textAlign: 'center', marginTop: 20 }} key={index} >{msg}</HermoText>
                            )) : null
                    }
                    <Button
                        style={{
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: getYdp(3),
                            marginBottom: 29,
                            backgroundColor: '#49525d',
                        }}
                        block={true}
                        onPress={this.onSignUpHandler}
                    >
                        {
                            this.props.signupscreen.loading ?
                                <Spinner color="white" /> :
                                <Text style={{ textAlign: 'center', alignSelf: 'center', padding: 15, color: 'white', fontSize: 20 }}>Join Mr SOS</Text>
                        }
                    </Button>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: getYdp(10) }}>
                        <Text style={{ textAlign: 'center', alignSelf: 'center', marginRight: 3, color: 'gray', fontSize: 15 }}>
                            By creating an account, you agree to our
                        </Text>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={{ color: 'gray', fontSize: 13, textDecorationLine: 'underline' }}>Terms</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ textAlign: 'center', alignSelf: 'center', marginRight: 3, color: 'gray', fontSize: 15 }}>
                            Login with email?
                        </Text>
                        <TouchableOpacity onPress={this.onLoginHandler}>
                            <Text style={{ color: 'gray', fontSize: 13, textDecorationLine: 'underline' }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}

SignUpScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    signupscreen: makeSelectSignUpScreen(),
    auth: makeSelectSignUpScreenAuth(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signUpScreen', reducer });
const withSaga = injectSaga({ key: 'signUpScreen', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(SignUpScreen);
