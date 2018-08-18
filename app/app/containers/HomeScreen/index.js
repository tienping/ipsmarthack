/**
 *
 * HomeScreen
 *
 */

import ButtonLink from 'components/ButtonLink/index';
import Carousel from 'components/Carousel/index';
import LoadingScreen from 'components/LoadingScreen/index';
import ProductGridViewSlider from 'components/ProductGridViewSlider/index';
import ProductListViewList from 'components/ProductListViewList';
import QuickLink from 'components/QuickLink/index';
import Twoh from 'components/Twoh/index';
import { handleAppLink } from 'utils/appLinkHandler';
import _ from 'lodash';
import {
    Button,
    Spinner,
} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { HermoText } from 'style/HerComponent/index';

import { View, ScrollView, BackHandler, ToastAndroid, Image } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Divider from 'components/Divider';
import HeadLine from 'components/HeadLine/index';
import { makeSelectUserProfile } from 'containers/UserProfileScreen/selectors';
import { fetchUserProfile } from 'containers/UserProfileScreen/actions';
import SearchBarButton from 'containers/ExploreScreen/SearchBarButton';
import { globalScope } from 'hermo/globalScope';

import { dataChecking, HerToast, getXdp, transfromViewHeightBasedOnPercentage } from 'utils/hermoUtils';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { attendanceRequest, fetchRecentlyViewed, clearRecentlyViewed, fetchStore, fetchRecommendedProduct } from './actions';
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
        this.props.dispatch(fetchStore());
        this.props.dispatch(fetchRecentlyViewed());
        if (globalScope.token) {
            this.props.dispatch(fetchUserProfile());
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
                    this.props.dispatch(fetchRecommendedProduct());
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

    getContent = () => {
        const {
            twoh,
            recommendedProduct,
            recommendedProductTitle,
            recentlyViewed,
            recentlyViewedLoading,
            // recentlyViewedError,
            shortcutLink,
            banner,
            buttonLink,
            newArrival,
            quickLink,
            sponsor,
        } = this.props;

        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <SearchBarButton navigator={this.props.navigator} />
                {
                    globalScope.token && shortcutLink && dataChecking(shortcutLink, 'items').length >= 4
                    && dataChecking(shortcutLink, 'items').length <= 8 ?
                        <View>
                            <ButtonLink
                                buttons={shortcutLink.items.slice(0, 4)}
                                itemSelected={this.menuItemSelected}
                            />
                            <ButtonLink
                                buttons={shortcutLink.items.slice(4, 8)}
                                itemSelected={this.menuItemSelected}
                            />
                            <Divider />
                        </View>
                        : null
                }

                {
                    banner && dataChecking(banner, 'items').length > 0 ?
                        <View>
                            <Carousel banners={banner.items} autoPlay={true} navigator={this.props.navigator} />
                            <Divider />
                        </View>
                        : null
                }

                {
                    twoh && dataChecking(twoh, 'items').length > 0 ?
                        <View>
                            <Twoh result={twoh.items} title={twoh.title} navigator={this.props.navigator} />
                            <Divider />
                        </View>
                        :
                        null
                }

                {
                    buttonLink && dataChecking(buttonLink, 'items').length === 4 ?
                        <View>
                            <ButtonLink
                                buttons={buttonLink.items}
                                itemSelected={this.menuItemSelected}
                            />
                            <Divider />
                        </View>
                        : null
                }

                {
                    newArrival && dataChecking(newArrival, 'product', 'items') ?
                        <View>
                            <HeadLine data={dataChecking(newArrival, 'headline')} navigator={this.props.navigator} />
                            <ProductGridViewSlider items={newArrival.product.items} navigator={this.props.navigator} />
                            <Divider />
                        </View>
                        :
                        null
                }

                <View>
                    <View style={{ backgroundColor: 'white', justifyContent: 'center' }}>
                        <Image style={{ width: getXdp(100), height: transfromViewHeightBasedOnPercentage(100, 800, 1) }} source={require('../../Resources/usp.gif')} />
                    </View>
                    <Divider />
                </View>

                {
                    newArrival && dataChecking(newArrival, 'product', 'items') ?
                        <View>
                            <HeadLine data={dataChecking(newArrival, 'headline')} navigator={this.props.navigator} />
                            <ProductListViewList items={newArrival.product.items.slice(0, 3)} type="BESTSELLERS" navigator={this.props.navigator} dispatch={this.props.dispatch} />
                            <Divider />
                        </View>
                        :
                        null
                }

                {
                    recommendedProduct && recommendedProduct.length > 0 ?
                        <View>
                            <HeadLine data={recommendedProductTitle} navigator={this.props.navigator} />
                            <ProductGridViewSlider items={recommendedProduct} navigator={this.props.navigator} />
                            <Divider />
                        </View>
                        : null
                }

                {
                    quickLink && dataChecking(quickLink, 'items') ?
                        <View>
                            <QuickLink quickLink={quickLink.items} navigator={this.props.navigator} />
                            <Divider />
                        </View>
                        : null
                }

                {
                    sponsor && dataChecking(sponsor, 'items').length > 0 ?
                        <View>
                            <Carousel banners={sponsor.items} autoPlay={false} navigator={this.props.navigator} />
                            <Divider />
                        </View>
                        : null
                }

                {
                    <View
                        style={{ position: 'relative', backgroundColor: 'white', paddingTop: 10 }}
                    >
                        <View style={{ flexDirection: 'row' }} >
                            <HermoText color="black" fontType="bodyTitle" style={{ padding: 10, backgroundColor: 'white', fontWeight: 'bold' }}>Recently Viewed</HermoText>
                            {
                                recentlyViewed ?
                                    <Button
                                        transparent={true}
                                        success={true}
                                        onPress={() => { this.props.dispatch(clearRecentlyViewed()); }}
                                        style={{ position: 'absolute', right: 0 }}
                                    >
                                        <HermoText fontType="body" color="SILVER" style={{ padding: 10 }}>Clear</HermoText>
                                    </Button> : null
                            }
                        </View>
                        {
                            recentlyViewedLoading ?
                                <View
                                    style={{
                                        backgroundColor: 'transparent',
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        height: 200,
                                    }}
                                >
                                    <Spinner color="#9a9a9a" />
                                </View>
                                :
                                this.LocalStorageRecentlyViewedData(recentlyViewed)
                        }
                    </View>
                }
            </ScrollView>
        );
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

    menuItemSelected = (item) => {
        const { attendanceMessage, attendanceToken, attendanceSuccess, dispatch } = this.props;

        if (dataChecking(item, '_applink')) {
            handleAppLink(item._applink, this.props.navigator);
        } else {
            if (dataChecking(item, 'title') === 'ATTENDANCE') {
                if (globalScope.token) {
                    if (!attendanceSuccess && attendanceToken === globalScope.token && attendanceMessage) {
                        this.showToast(attendanceMessage);
                    } else {
                        dispatch(attendanceRequest());
                    }
                } else {
                    this.props.navigator.showModal({
                        screen: 'hermorn.screen.Login',
                        title: 'LOGIN',
                        animationType: 'slide-up',
                    });
                }
            } else if (dataChecking(item, 'title') === 'BUNDLE BOX') {
                this.props.navigator.push({
                    screen: 'hermorn.screen.BundleBox',
                    animated: true,
                    backButtonTitle: '',
                    title: 'Bundle Box',
                    passProps: {
                        bundleID: '4877',
                    },
                });
            } else if (dataChecking(item, 'title') === 'WISHLISTS') {
                this.props.navigator.push({
                    screen: 'hermorn.screen.WishList',
                    animated: true,
                    backButtonTitle: '',
                    title: 'WISHLIST',
                });
            } else if (dataChecking(item, 'title') === 'ORDERS') {
                this.props.navigator.push({
                    screen: 'hermorn.screen.OrderList',
                    animated: true,
                    backButtonTitle: '',
                    title: 'ORDERS',
                });
            } else if (dataChecking(item, 'title') === 'REVIEWS') {
                this.props.navigator.push({
                    screen: 'hermorn.screen.BeautyPostForm',
                    animated: true,
                    backButtonTitle: '',
                    title: 'WRITE REVIEW',
                    passProps: {
                        profile: this.props.profile,
                    },
                });
            }
            return null;
        }
        return null;
    }

    LocalStorageRecentlyViewedData(data) {
        if (data) {
            const list = [];
            _.forOwn(data, (value) => {
                const item = JSON.parse(value.product);
                list.unshift(item);
            });

            return <ProductGridViewSlider productCardType="RECENTLY_VIEW" items={list} navigator={this.props.navigator} />;
        }

        return <HermoText fontType="body" color="GRAY" style={{ padding: 10, paddingBottom: 30 }}>No record yet...</HermoText>;
    }

    render() {
        const { loading, store } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {
                    loading === false && store ?
                        this.getContent()
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
