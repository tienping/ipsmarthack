/*
 *
 * HomeScreen actions
 *
 */

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

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}
export function fetchStore() {
    return {
        type: FETCH_STORE,
    };
}

export function fetchStoreSuccess(response) {
    return {
        type: FETCH_STORE_SUCCESS,
        payload: response,
    };
}

export function fetchStoreFailed(response) {
    return {
        type: FETCH_STORE_FAILED,
        payload: response,
    };
}

export function attendanceRequest() {
    return {
        type: ATTENDANCE_REQUEST,
    };
}

export function attendanceSuccess(response, token) {
    return {
        type: ATTENDANCE_SUCCESS,
        payload: {
            response,
            token,
        },
    };
}

export function attendanceFailed(response, token) {
    return {
        type: ATTENDANCE_FAILED,
        payload: {
            response,
            token,
        },
    };
}

export function fetchRecentlyViewed() {
    return {
        type: FETCH_RECENTLY_VIEWED,
    };
}

export function fetchRecentlyViewedSuccess(response) {
    return {
        type: FETCH_RECENTLY_VIEWED_SUCCESS,
        payload: response,
    };
}

export function fetchRecentlyViewedFailed(response) {
    return {
        type: FETCH_RECENTLY_VIEWED_FAILED,
        payload: response,
    };
}

export function clearRecentlyViewed() {
    return {
        type: CLEAR_RECENTLY_VIEWED,
    };
}

export function clearRecentlyViewedSuccess(response) {
    return {
        type: CLEAR_RECENTLY_VIEWED_SUCCESS,
        payload: response,
    };
}

export function clearRecentlyViewedFailed(response) {
    return {
        type: CLEAR_RECENTLY_VIEWED_FAILED,
        payload: response,
    };
}

export function fetchRecommendedProduct(response) {
    return {
        type: FETCH_RECOMMENDED_PRODUCT,
        payload: response,
    };
}
export function fetchRecommendedProductSuccess(response, token) {
    return {
        type: FETCH_RECOMMENDED_PRODUCT_SUCCESS,
        payload: response,
        token,
    };
}

export function fetchRecommendedProductFailed(response) {
    return {
        type: FETCH_RECOMMENDED_PRODUCT_FAILED,
        payload: response,
    };
}
