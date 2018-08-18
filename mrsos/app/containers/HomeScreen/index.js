/**
 *
 * HomeScreen
 *
 */

import LoadingScreen from 'components/LoadingScreen/index';
import PropTypes from 'prop-types';
import React from 'react';
import { HermoText } from 'style/HerComponent/index';

import { View, BackHandler, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectUserProfile } from 'containers/UserProfileScreen/selectors';
import { globalScope } from 'hermo/globalScope';

import { dataChecking, HerToast } from 'utils/hermoUtils';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
    makeSelectAttendanceMessage,
    makeSelectAttendanceToken,
    makeSelectRecentlyViewed,
    makeSelectRecentlyViewedLoading,
    makeSelectRecentlyViewedError,
    makeSelectRecommendedProduct,
    makeSelectRecommendedProductTitle,
    makeSelectDataToken,
    makeSelectStore,
    makeSelectStoreBanner,
    makeSelectStoreButtonLink,
    makeSelectStoreLoading,
    makeSelectStoreNewArrival,
    makeSelectStoreQuickLink,
    makeSelectStoreShortcutLink,
    makeSelectStoreTWOH,
    makeSelectAttendanceSuccess,
    makeSelectStoreSponsor,
} from './selectors';
import saga from './saga';
import reducer from './reducer';

export class HomeScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount() {
        // this.props.dispatch(fetchStore());
        // this.props.dispatch(fetchRecentlyViewed());
        if (globalScope.token) {
            // this.props.dispatch(fetchUserProfile());
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.attendanceMessage !== this.props.attendanceMessage) {
            this.showToast(nextProps.attendanceMessage);
        }
    }

    onNavigatorEvent(event) {
        switch (event.id) {
            case 'willAppear':
                this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
                if (this.props.dataToken !== globalScope.token) {
                    // this.props.dispatch(fetchRecommendedProduct());
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

    handleBackPress = () => {
        if (this.backPressed && this.backPressed > 0) {
            this.props.navigator.popToRoot({ animated: false });
            return false;
        }

        this.backPressed = 1;
        ToastAndroid.show('Press one more time to exit', ToastAndroid.SHORT);
        return true;
    }

    showToast(msgObj) {
        HerToast.show({
            text: dataChecking(msgObj, 'text'),
            type: dataChecking(msgObj, 'type') === 'error' ? 'danger' : 'success',
            duration: 'long',
            navigator: this.props.navigator,
        });
    }

    render() {
        const { loading, store } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {
                    loading === false && store ?
                        <HermoText>Content</HermoText>
                        :
                        <LoadingScreen visible={true} />
                }
            </View>
        );
    }
}

HomeScreen.propTypes = {
    loading: PropTypes.bool,
    store: PropTypes.object,
    twoh: PropTypes.object,
    dispatch: PropTypes.func,
    recentlyViewed: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    loading: makeSelectStoreLoading(),
    dataToken: makeSelectDataToken(),
    store: makeSelectStore(),
    twoh: makeSelectStoreTWOH(),
    recommendedProductTitle: makeSelectRecommendedProductTitle(),
    recommendedProduct: makeSelectRecommendedProduct(),
    recentlyViewed: makeSelectRecentlyViewed(),
    recentlyViewedLoading: makeSelectRecentlyViewedLoading(),
    recentlyViewedError: makeSelectRecentlyViewedError(),
    attendanceMessage: makeSelectAttendanceMessage(),
    attendanceToken: makeSelectAttendanceToken(),
    shortcutLink: makeSelectStoreShortcutLink(),
    banner: makeSelectStoreBanner(),
    buttonLink: makeSelectStoreButtonLink(),
    newArrival: makeSelectStoreNewArrival(),
    quickLink: makeSelectStoreQuickLink(),
    attendanceSuccess: makeSelectAttendanceSuccess(),
    sponsor: makeSelectStoreSponsor(),
    profile: makeSelectUserProfile(),
});

export function mapDispatchToProps(dispatch) {
    return { dispatch };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homeScreen', reducer });
const withSaga = injectSaga({ key: 'homeScreen', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HomeScreen);
