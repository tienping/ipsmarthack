/*
 *
 * PopupDialog actions
 *
 */

import {
    GET_API_DATA,
    GET_API_DATA_FAILED,
    GET_API_DATA_SUCCESS,
    GET_BUNDLE_DATA,
    GET_BUNDLE_DATA_FAILED,
    GET_BUNDLE_DATA_SUCCESS,
} from './constants';


export function getApiData(url) {
    return {
        type: GET_API_DATA,
        url,
    };
}

export function getApiDataSuccess(response) {
    return {
        type: GET_API_DATA_SUCCESS,
        payload: response,
    };
}

export function getApiDataFailed(response) {
    return {
        type: GET_API_DATA_FAILED,
        payload: response,
    };
}


export function getBundleData(productID, bundleID) {
    return {
        type: GET_BUNDLE_DATA,
        productID,
        bundleID,
    };
}

export function getBundleDataSuccess(response) {
    return {
        type: GET_BUNDLE_DATA_SUCCESS,
        payload: response,
    };
}

export function getBundleDataFailed(response) {
    return {
        type: GET_BUNDLE_DATA_FAILED,
        payload: response,
    };
}
