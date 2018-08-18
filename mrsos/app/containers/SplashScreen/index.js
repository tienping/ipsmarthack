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
import branch from 'react-native-branch';
import { Navigation } from 'react-native-navigation';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { readSchema } from 'utils/realmStorage';

import { goToLanding } from 'hermo/HermornScreens';
import { globalScope } from 'hermo/globalScope';
import { ImageHolder } from 'components/ImageLink/index';
import { appLinkGenerator } from 'utils/hermoUtils';
import { handleAppLink } from 'utils/appLinkHandler';

import makeSelectSplashScreen, { makeSelectCommonData, makeSelectCommonLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import colorPalette from '../../style/colorPalette';
import { fetchGetCommonData } from './actions';

export class SplashScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(fetchGetCommonData());

        branch.subscribe(({ error, params }) => {
            if (error) {
                return;
            }
            const page = params.$page;
            const href = params.$href;
            const itemId = params.$item_id;

            handleAppLink(appLinkGenerator('new-page', page, href, itemId), this.props.navigator);
        });

        NetInfo.isConnected.fetch().then((isConnected) => {
            globalScope.isConnected = isConnected;
        });

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.commonData !== this.props.commonData) {
            readSchema('Auth').then((result) => {
                if (result && result[0]) {
                    globalScope.token = result[0].token;
                    globalScope.isAdmin = result[0].isAdmin;
                    globalScope.debuggerMode = result[0].debuggerMode;

                    goToLanding(this.props.navigator, this);
                } else {
                    Navigation.startSingleScreenApp({
                        screen: {
                            screen: 'hermorn.screen.Welcome',
                            title: 'WELCOME',
                            navigatorStyle: {
                                navBarHidden: true,
                                tabBarHidden: true,
                            },
                        },
                    });
                }
            });
        }
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
