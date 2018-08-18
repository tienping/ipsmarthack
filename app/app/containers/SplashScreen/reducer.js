/*
 *
 * SplashScreen reducer
 *
 */

import { fromJS } from 'immutable';
import {
    FETCH_GET_COMMON_DATA, FETCH_GET_COMMON_DATA_FAILED, FETCH_GET_COMMON_DATA_SUCCESS,
} from './constants';

const initialState = fromJS({
    loading: false,
    commonData: null,
    error: null,
});

function splashScreenReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GET_COMMON_DATA:
            return state
                .set('loading', true)
                .set('error', false);
        case FETCH_GET_COMMON_DATA_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('commonData', action.payload);
        case FETCH_GET_COMMON_DATA_FAILED:
            return state
                .set('loading', false)
                .set('error', true);
        default:
            return state;
    }
}

export default splashScreenReducer;
