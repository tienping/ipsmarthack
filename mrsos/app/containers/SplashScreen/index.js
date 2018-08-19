/**
 *
 * SplashScreen
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, NetInfo } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Navigation } from 'react-native-navigation';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { readSchema } from 'utils/realmStorage';

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
        OneSignal.init('5391a370-3b55-4668-95ed-e44b42cc4bc2');

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
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
        goToLanding(this.props.navigator, this);

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

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        alert(`Received: ${notification}`);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    handleFirstConnectivityChange = (isConnected) => {
        globalScope.isConnected = isConnected;
    }

    render() {
        return (
            <View style={{ backgroundColor: colorPalette.TyrianPurple }} >
                {/* <ImageHolder imageStyle={{ alignItems: 'center', justifyContent: 'center' }} imageSource="https://cdn3.hermo.my/hermo/imagelink/2016/nyx-footer-banner_11496890086.png" /> */}
            </View>
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
