import { createSelector } from 'reselect';

/**
 * Direct selector to the homeScreen state domain
 */
const selectHomeScreenDomain = (state) => state.get('homeScreen');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HomeScreen
 */

const makeSelectStoreLoading = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('loading')
);

const makeSelectDataToken = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('dataToken')
);

const makeSelectStore = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('store')
);

const makeSelectStoreTWOH = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('twoh')
);

const makeSelectAttendanceMessage = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('attendanceMessage')
);

const makeSelectAttendanceToken = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('attendanceToken')
);

const makeSelectAttendanceSuccess = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('attendanceSuccess')
);

const makeSelectRecommendedProductTitle = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('recommendedProductTitle')
);
const makeSelectRecommendedProduct = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('recommendedProduct')
);
const makeSelectRecentlyViewed = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('recentlyViewed')
);
const makeSelectRecentlyViewedLoading = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('recentlyViewedLoading')
);
const makeSelectRecentlyViewedError = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('recentlyViewedError')
);

const makeSelectStoreShortcutLink = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('shortcutLink')
);
const makeSelectStoreBanner = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('banner')
);
const makeSelectStoreButtonLink = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('buttonLink')
);
const makeSelectStoreNewArrival = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('newArrival')
);
const makeSelectStoreQuickLink = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('quickLink')
);
const makeSelectStoreSponsor = () => createSelector(
    selectHomeScreenDomain,
    (substate) => substate.get('sponsor')
);

export {
    selectHomeScreenDomain,
    makeSelectStoreLoading,
    makeSelectDataToken,
    makeSelectStore,
    makeSelectStoreTWOH,
    makeSelectRecentlyViewed,
    makeSelectRecentlyViewedLoading,
    makeSelectRecentlyViewedError,
    makeSelectAttendanceMessage,
    makeSelectAttendanceToken,
    makeSelectRecommendedProductTitle,
    makeSelectRecommendedProduct,
    makeSelectStoreShortcutLink,
    makeSelectStoreBanner,
    makeSelectStoreButtonLink,
    makeSelectStoreNewArrival,
    makeSelectStoreQuickLink,
    makeSelectAttendanceSuccess,
    makeSelectStoreSponsor,
};
