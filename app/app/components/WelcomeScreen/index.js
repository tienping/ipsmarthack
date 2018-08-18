/**
 *
 * WelcomeScreen
 *
 */

import React from 'react';
import Swiper from 'react-native-swiper';
import { Dimensions, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { goToLanding } from 'hermo/HermornScreens';
import { transfromViewWidthToPercentage, transfromViewHeightToPercentage } from 'utils/hermoUtils';

const styles = StyleSheet.create({
    skipButton: {
        borderWidth: 1,
        bottom: 0,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'absolute',
        right: 10,
        borderColor: 'rgb(102,0,51)',
    },
    loginButton: {
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'absolute',
        marginTop: 500,
        bottom: 10,
        left: 15,
        marginRight: 10,
        width: (Dimensions.get('window').width / 2) - 20,
        borderColor: 'rgb(102,0,51)',
    },
    signUpButton: {
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'absolute',
        bottom: 10,
        right: 15,
        marginLeft: 10,
        width: (Dimensions.get('window').width / 2) - 20,
        borderColor: 'rgb(102,0,51)',
        backgroundColor: 'rgb(102,0,51)',
    },
    text: {
        fontSize: 14,
        color: 'rgb(102,0,51)',
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: '600',
    },
    outlineText: {
        fontSize: 14,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: '600',
    },
});

class WelcomeScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static navigatorStyle = {
        tabBarHidden: true,
    }

    skipLoginPressed = () => {
        goToLanding(this.props.navigator, this);
    };

    loginPressed = () => {
        this.props.navigator.showModal({
            screen: 'hermorn.screen.Login',
            title: 'LOGIN',
            animationType: 'slide-up',
        });
    };

    signUpPressed = () => {
        this.props.navigator.showModal({
            screen: 'hermorn.screen.SignUp',
            title: 'SIGN UP',
            animationType: 'slide-up',
        });
    };

    render() {
        return (
            <View style={{ flex: 1, position: 'relative' }} >
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={this.skipLoginPressed}
                    >
                        <Text style={[styles.text, { color: 'grey' }]}>SKIP</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 8, backgroundColor: 'white' }}>
                    <Swiper
                        dot={<View
                            style={{
                                backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,
                            }}
                        />}

                        activeDot={<View
                            style={{
                                backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,
                            }}
                        />}
                        height={transfromViewHeightToPercentage(0.8)}
                        autoplay={true}
                        autoplayTimeout={4}
                        paginationStyle={{ justifyContent: 'center' }}
                    >
                        <Image style={{ height: transfromViewHeightToPercentage(0.8), width: transfromViewWidthToPercentage(0.8), alignSelf: 'center' }} source={require('../../Resources/welcome-1.jpg')} />
                        <Image style={{ height: transfromViewHeightToPercentage(0.8), width: transfromViewWidthToPercentage(0.8), alignSelf: 'center' }} source={require('../../Resources/welcome-2.jpg')} />
                        <Image style={{ height: transfromViewHeightToPercentage(0.8), width: transfromViewWidthToPercentage(0.8), alignSelf: 'center' }} source={require('../../Resources/welcome-3.jpg')} />

                    </Swiper>
                </View>

                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this.loginPressed}
                    >
                        <Text style={styles.text}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={this.signUpPressed}
                    >
                        <Text style={styles.outlineText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

WelcomeScreen.propTypes = {};

export default WelcomeScreen;
