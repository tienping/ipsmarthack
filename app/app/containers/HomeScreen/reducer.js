/*
 *
 * HomeScreen reducer
 *
 */

import { fromJS } from 'immutable';
import { dataChecking } from 'utils/hermoUtils';
import {
    DEFAULT_ACTION,
    FETCH_STORE,
    FETCH_STORE_FAILED,
    FETCH_STORE_SUCCESS,
    ATTENDANCE_REQUEST,
    ATTENDANCE_SUCCESS,
    ATTENDANCE_FAILED,
    FETCH_RECENTLY_VIEWED,
    FETCH_RECENTLY_VIEWED_SUCCESS,
    FETCH_RECENTLY_VIEWED_FAILED,
    CLEAR_RECENTLY_VIEWED,
    CLEAR_RECENTLY_VIEWED_SUCCESS,
    CLEAR_RECENTLY_VIEWED_FAILED,
    FETCH_RECOMMENDED_PRODUCT,
    FETCH_RECOMMENDED_PRODUCT_SUCCESS,
    FETCH_RECOMMENDED_PRODUCT_FAILED,
} from './constants';

export const initialState = fromJS({
    loading: false,
    error: false,
    dataToken: null,
    store: null,
    twoh: null,
    recommendedProductTitle: null,
    recommendedProduct: null,
    recentlyViewed: {},
    recentlyViewedLoading: false,
    recentlyViewedError: false,
    attendanceMessage: null,
    attendanceToken: '',
    attendanceSuccess: false,
    shortcutLink: null,
    banner: null,
    buttonLink: null,
    newArrival: null,
    quickLink: null,
    sponsor: null,
});

function homeScreenReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;
        case FETCH_STORE:
            return state
                .set('loading', true)
                .set('error', false);
        case FETCH_STORE_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('shortcutLink', dataChecking(action, 'payload', 'shortcut_link'))
                .set('banner', dataChecking(action, 'payload', 'banner'))
                .set('buttonLink', dataChecking(action, 'payload', 'button_link'))
                .set('twoh', dataChecking(action, 'payload', 'twoh'))
                .set('newArrival', dataChecking(action, 'payload', 'new_arrival'))
                .set('quickLink', dataChecking(action, 'payload', 'quick_link'))
                .set('sponsor', dataChecking(action, 'payload', 'sponsor'))
                .set('store', action, 'payload');
        case FETCH_STORE_FAILED:
            return state
                .set('loading', false)
                .set('error', true)
                .set('store', action, 'payload');
        case FETCH_RECOMMENDED_PRODUCT:
            return state
                .set('recommendedProduct', null);
        case FETCH_RECOMMENDED_PRODUCT_SUCCESS:
            return state
                .set('loading', false)
                .set('dataToken', action.token)
                .set('error', false)
                .set('recommendedProductTitle', dataChecking(action, 'payload', 'data', 'headline'))
                .set('recommendedProduct', dataChecking(action, 'payload', 'data', 'product', 'items'));
        case FETCH_RECOMMENDED_PRODUCT_FAILED:
            return state
                .set('loading', false)
                .set('error', true);
        case ATTENDANCE_REQUEST:
            return state
                .set('attendanceMessage', null)
                .set('attendanceToken', '');
        case ATTENDANCE_SUCCESS:
            return state
                .set('attendanceMessage', dataChecking(action, 'payload', 'response', 'messages', '0'))
                .set('attendanceSuccess', dataChecking(action, 'payload', 'response', 'success'))
                .set('attendanceToken', dataChecking(action, 'payload', 'token'));
        case ATTENDANCE_FAILED:
            return state
                .set('attendanceMessage', dataChecking(action, 'payload', 'response', 'messages', '0'))
                .set('attendanceSuccess', dataChecking(action, 'payload', 'response', 'success'))
                .set('attendanceToken', dataChecking(action, 'payload', 'token'));
        case FETCH_RECENTLY_VIEWED:
            return state
                .set('recentlyViewedLoading', true)
                .set('recentlyViewedError', false);
        case FETCH_RECENTLY_VIEWED_SUCCESS:
            return state
                .set('recentlyViewedLoading', false)
                .set('recentlyViewedError', false)
                .setIn(['recentlyViewed'], action.payload);
        case FETCH_RECENTLY_VIEWED_FAILED:
            return state
                .set('recentlyViewedLoading', false)
                .set('recentlyViewedError', true);
        case CLEAR_RECENTLY_VIEWED:
            return state
                .set('recentlyViewedLoading', true)
                .set('recentlyViewedError', false);
        case CLEAR_RECENTLY_VIEWED_SUCCESS:
            return state
                .set('recentlyViewedLoading', false)
                .set('recentlyViewedError', false)
                .setIn(['recentlyViewed'], action.payload);
        case CLEAR_RECENTLY_VIEWED_FAILED:
            return state
                .set('recentlyViewedLoading', false)
                .set('recentlyViewedError', true);
        default:
            return state;
    }
}

export default homeScreenReducer;
