/*
 *
 * SignUpScreen reducer
 *
 */

import { fromJS } from 'immutable';
import {
    SIGN_UP_REQUEST,
    SIGN_UP_FAILED,
    SIGN_UP_SUCCESS,
} from './constants';

const initialState = fromJS({
    token: null,
    loading: false,
    error: false,
});

function signUpScreenReducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_UP_REQUEST:
            return state
                .set('loading', true)
                .set('error', false);
        case SIGN_UP_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('auth', action.payload);
        case SIGN_UP_FAILED:
            return state
                .set('loading', false)
                .set('error', action.payload);
        default:
            return state;
    }
}

export default signUpScreenReducer;
