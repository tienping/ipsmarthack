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
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import FBSDK from 'react-native-fbsdk';
import { goToLanding } from 'hermo/HermornScreens';
import { HermoText } from 'style/HerComponent';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import colorPalette from 'style/colorPalette';
import { getFbUserProfileData } from 'containers/LoginScreen';

import makeSelectSignUpScreen, { makeSelectSignUpScreenAuth } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signUpRequest } from './actions';

const {
    LoginButton,
    AccessToken,
} = FBSDK;

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
                this.setState({ usernameErrText: 'Please enter username.' });
            } else {
                this.setState({ usernameErr: false });
                this.setState({ usernameErrText: '' });
            }
            if (email === '') {
                this.setState({ emailErr: true });
                this.setState({ emailErrText: 'Please enter email address.' });
            } else {
                this.setState({ emailErr: false });
                this.setState({ emailErrText: '' });
            }
            if (password === '') {
                this.setState({ passwordErr: true });
                this.setState({ passwordErrText: 'Please enter password.' });
            } else {
                this.setState({ passwordErr: false });
                this.setState({ passwordErrText: '' });
            }
            if (password_confirmation === '') {
                this.setState({ cpasswordErr: true });
                this.setState({ cpasswordErrText: 'Please enter confirmation password.' });
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
                        {/* <Icon style={{ position: 'absolute', left: 10 }} name="close" onPress={this.onCloseHandler} /> */}
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>SIGN UP WITH</Text>
                        {/* <View style={{ flexDirection: 'row', paddingTop: 27, paddingBottom: 31.4 }}>
                            <Image style={{ height: 48, width: 48, marginLeft: 17, marginRight: 17 }} source={require('../../Resources/fb.png')} />
                            <Image style={{ height: 48, width: 48, marginLeft: 17, marginRight: 17 }} source={require('../../Resources/gplus.png')} />
                        </View> */}
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 20 }}>
                            <LoginButton
                                publishPermissions={['publish_actions']}
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
                            <View style={{ borderColor: this.state.usernameErr ? 'red' : null, borderWidth: this.state.usernameErr ? 1 : 0 }}>
                                <Item error={this.state.usernameErr} style={{ marginLeft: 0 }}>
                                    <Image style={{ marginLeft: 10, width: 16, height: 16 }} source={require('../../Resources/user.png')} />
                                    <Input
                                        style={{ fontSize: 10, color: 'gray', marginLeft: 5 }}
                                        placeholder="Username*"
                                        value={this.state.username}
                                        onChangeText={(username) => this.onTextChange('username', username)}
                                    />
                                </Item>
                            </View>
                            {
                                this.state.usernameErr ?
                                    <View style={{ backgroundColor: 'red', flexDirection: 'row', paddingLeft: 10 }}>
                                        <Icon name="information-circle" style={{ color: 'white', fontSize: 16, alignSelf: 'center' }} />
                                        <HermoText color="WhiteSmoke" style={{ textAlign: 'center', padding: 2 }}>{this.state.usernameErrText}</HermoText>
                                    </View> : null
                            }

                            <View style={{ borderColor: this.state.emailErr ? 'red' : null, borderWidth: this.state.emailErr ? 1 : 0 }}>
                                <Item error={this.state.emailErr} style={{ marginLeft: 0 }}>
                                    <Image style={{ marginLeft: 10, width: 16, height: 16 }} source={require('../../Resources/email.png')} />
                                    <Input
                                        style={{ fontSize: 10, color: 'gray', marginLeft: 5 }}
                                        placeholder="Email Address*"
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
                                    <Image style={{ marginLeft: 10, width: 16, height: 16 }} source={require('../../Resources/pass.png')} />
                                    <Input
                                        style={{ fontSize: 10, color: 'gray', marginLeft: 5, flex: 8 }}
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
                                this.state.cpasswordErr ?
                                    <View style={{ backgroundColor: 'red', flexDirection: 'row', paddingLeft: 10 }}>
                                        <Icon name="information-circle" style={{ color: 'white', fontSize: 16, alignSelf: 'center' }} />
                                        <HermoText color="WhiteSmoke" style={{ textAlign: 'center', padding: 2 }}>{this.state.cpasswordErrText}</HermoText>
                                    </View> : null
                            }

                            <View style={{ borderColor: this.state.cpasswordErr ? 'red' : null, borderWidth: this.state.cpasswordErr ? 1 : 0, marginTop: 10 }}>
                                <Item error={this.state.cpasswordErr} style={{ marginLeft: 0, display: 'flex', flexDirection: 'row' }}>
                                    <Image style={{ marginLeft: 10, width: 16, height: 16 }} source={require('../../Resources/pass.png')} />
                                    <Input
                                        style={{ fontSize: 10, color: 'gray', marginLeft: 5, flex: 8 }}
                                        placeholder="Password*"
                                        secureTextEntry={this.state.cpasswordHide}
                                        value={this.state.cpassword}
                                        onChangeText={(cpassword) => this.onTextChange('cpassword', cpassword)}
                                    />
                                    <TouchableOpacity onPress={() => this.toggleCPasswordHideAndShow()}>
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
                                this.state.cpasswordErr ?
                                    <View style={{ backgroundColor: 'red', flexDirection: 'row', paddingLeft: 10 }}>
                                        <Icon name="information-circle" style={{ color: 'white', fontSize: 16, alignSelf: 'center' }} />
                                        <HermoText color="WhiteSmoke" style={{ textAlign: 'center', padding: 2 }}>{this.state.cpasswordErrText}</HermoText>
                                    </View> : null
                            }
                        </Form>
                    </View>
                    {/* <View style={{ backgroundColor: 'lightgray', paddingLeft: 25, paddingTop: 10, paddingBottom: 20 }}>
                        <Text style={{ fontSize: 12, paddingTop: 10, paddingBottom: 5, color: 'black' }}>Date Of Birth (optional)</Text>
                        <Row style={{ display: 'flex', flexDirection: 'row' }}>
                            <Col4>
                                <Picker
                                    style={{ backgroundColor: 'white', height: 30 }}
                                    mode="dropdown"
                                    selectedValue={this.state.day}
                                    onValueChange={(itemValue) => this.setState({ day: itemValue })}>
                                    <Item label="01" value="01" />
                                    <Item label="02" value="02" />
                                    <Item label="03" value="03" />
                                    <Item label="04" value="04" />
                                </Picker>
                            </Col4>
                            <Col4>
                                <Picker
                                    style={{ backgroundColor: 'white', height: 30 }}
                                    mode="dropdown"
                                    selectedValue={this.state.month}
                                    onValueChange={(itemValue) => this.setState({ month: itemValue })}>
                                    <Item label="Jan" value="jan" />
                                    <Item label="Feb" value="feb" />
                                    <Item label="March" value="mar" />
                                    <Item label="April" value="apr" />
                                </Picker>
                            </Col4>
                            <Col4>
                                <Picker
                                    style={{ backgroundColor: 'white', height: 30 }}
                                    mode="dropdown"
                                    placeholder={this.state.year}
                                    selectedValue={this.state.year}
                                    onValueChange={(itemValue) => this.setState({ year: itemValue })}>
                                    <Item label="1996" value="1996" />
                                    <Item label="1997" value="1997" />
                                    <Item label="1998" value="1998" />
                                    <Item label="1999" value="1999" />
                                </Picker>
                            </Col4>
                        </Row>
                        <Text style={{ fontSize: 10, color: 'gray', marginTop: 5 }}>Let us know and we'll rock you with some treats!</Text>
                        <Text style={{ fontSize: 12, paddingTop: 10, color: 'black' }}>Gender (optional)</Text>
                        <Row>
                            <Col6 style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
                                <Radio selected={true} /><Text style={{ marginLeft: 15, fontSize: 12, alignSelf: 'center' }}>Male</Text>
                            </Col6>
                            <Col6 style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
                                <Radio selected={false} /><Text style={{ marginLeft: 15, fontSize: 12, alignSelf: 'center' }}>Female</Text>
                            </Col6>
                        </Row>
                    </View> */}
                    {/* <View style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 20 }}>
                        <Row>
                            <Col10>
                                <Text style={{ color: 'gray', fontSize: 10 }}>I want to receive newsletters and updates froms Hermo by email and post.</Text>
                            </Col10>
                            <Col2>
                                <Switch value={true} />
                            </Col2>
                        </Row>
                    </View> */}
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
                            marginTop: 20,
                            marginBottom: 29,
                            backgroundColor: this.state.username &&
                                                this.state.email &&
                                                this.state.password &&
                                                this.state.password_confirmation &&
                                                !this.state.usernameErr &&
                                                !this.state.emailErr &&
                                                !this.state.passwordErr &&
                                                !this.state.cpasswordErr ?
                                colorPalette.TyrianPurple : colorPalette.LightSilver,
                        }}
                        block={true}
                        onPress={this.onSignUpHandler}
                    >
                        {
                            this.props.signupscreen.loading ?
                                <Spinner color="white" /> :
                                <Text style={{ textAlign: 'center', alignSelf: 'center', color: 'white', fontSize: 14 }}>JOIN HERMO</Text>
                        }
                    </Button>
                    <Text style={{ textAlign: 'center', alignSelf: 'center', marginLeft: 50, marginRight: 50, color: 'gray', fontSize: 11 }}>
                        By signing up, you agree to our
                    </Text>
                    <Text style={{ textAlign: 'center', alignSelf: 'center', marginLeft: 50, marginRight: 50, color: 'gray', fontSize: 11, textDecorationLine: 'underline' }} onPress={this.privacyOnPressed}>
                        Privacy Policy & Terms of Service.
                    </Text>
                    <View style={{ marginLeft: 20, marginRight: 20 }}>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                width: '100%',
                                marginTop: 34.5,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 50.5, marginBottom: 7, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold' }}>Already have an account?</Text>
                    </View>
                    <View style={{ alignSelf: 'center', marginTop: 10, marginBottom: 40 }}>
                        <Button
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 2,
                                borderWidth: 0.5,
                                borderColor: 'gray',
                            }}
                            block={true}
                            onPress={this.onLoginHandler}
                        >
                            <Text style={{ textAlign: 'center', width: 100, color: 'rgb(102, 0, 51)', fontSize: 14, marginTop: 15, marginBottom: 15, marginLeft: 30, marginRight: 30 }}>LOGIN</Text>
                        </Button>
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
