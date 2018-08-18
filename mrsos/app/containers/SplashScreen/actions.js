/*
 *
 * SplashScreen actions
 *
 */

import {
    FETCH_GET_COMMON_DATA, FETCH_GET_COMMON_DATA_FAILED, FETCH_GET_COMMON_DATA_SUCCESS,
} from './constants';

export function fetchGetCommonData() {
    return {
        type: FETCH_GET_COMMON_DATA,
    };
}

export function fetchGetCommonDataSuccess(response) {
    return {
        type: FETCH_GET_COMMON_DATA_SUCCESS,
        payload: response,
    };
}

export function fetchGetCommonDataFailed(response) {
    return {
        type: FETCH_GET_COMMON_DATA_FAILED,
        payload: response,
    };
}
