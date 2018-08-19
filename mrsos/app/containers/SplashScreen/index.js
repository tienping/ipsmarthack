/**
 *
 * SplashScreen
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, NetInfo, Text, Image, TouchableOpacity } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Navigation } from 'react-native-navigation';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { readSchema } from 'utils/realmStorage';

import { HerToast, getYdp } from 'utils/hermoUtils';
import { goToLanding } from 'hermo/HermornScreens';
import { globalScope } from 'hermo/globalScope';
import { ImageHolder } from 'components/ImageLink/index';

import OneSignal from 'react-native-onesignal';
import makeSelectSplashScreen, { makeSelectCommonData, makeSelectCommonLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import colorPalette from '../../style/colorPalette';
import { fetchGetCommonData } from './actions';

export class SplashScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        // OneSignal.init('5391a370-3b55-4668-95ed-e44b42cc4bc2');

        readSchema('hero').then((result) => {
            if (result && result[0]) {
                globalScope.beHero = result[0].beHero;
                if (globalScope.behero) {
                    OneSignal.addEventListener('received', this.onReceived);
                    OneSignal.addEventListener('opened', this.onOpened);
                    OneSignal.addEventListener('ids', this.onIds);
                }
            }
        });
    }

    componentDidMount() {
        this.props.dispatch(fetchGetCommonData());

        NetInfo.isConnected.fetch().then((isConnected) => {
            globalScope.isConnected = isConnected;
        });

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
        );
    }

    componentWillReceiveProps(nextProps) {
        // goToLanding(this.props.navigator, this);
        // Navigation.startSingleScreenApp({
        //     screen: {
        //         screen: 'hermorn.screen.SignUp',
        //         title: '',
        //         navigatorStyle: {
        //             navBarHidden: true,
        //             tabBarHidden: true,
        //         },
        //     },
        // });
    }

    onReceived(notification) {
        // alert(`Received: ${notification}`);
    }

    onOpened = ({ notification }) => {

    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    handleFirstConnectivityChange = (isConnected) => {
        globalScope.isConnected = isConnected;
    }

    render() {
        return (
            <TouchableOpacity onPress={() => goToLanding(this.props.navigator)}>
                <View style={{ justifyContent: 'center', backgroundColor: colorPalette.White, height: getYdp(100) }} >
                    <Image style={{ alignSelf: 'center', alignItems: 'center', width: 300, height: 300 }} source={require('hermo/Resources/mrsos_launcher.jpg')} />
                </View>
            </TouchableOpacity>
        );
    }
}

SplashScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    splashscreen: makeSelectSplashScreen(),
    commonLoading: makeSelectCommonLoading(),
    commonData: makeSelectCommonData(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'splashScreen', reducer });
const withSaga = injectSaga({ key: 'splashScreen', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(SplashScreen);
