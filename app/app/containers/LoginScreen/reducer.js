/*
 *
 * LoginScreen reducer
 *
 */

import { fromJS } from 'immutable';
import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
    AUTH_LOGOUT,
    AUTH_FBLOGIN,
    AUTH_FBLOGOUT_SUCCESS,
    FORGET_PASSWORD_FAILED,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    RESET_MESSAGE_REQUEST,
} from './constants';

export const initialState = fromJS({
    loading: false,
    error: false,
    auth: {},
    forget: {},
    forgetLoading: false,
    forgetError: false,
});

function loginScreenReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return state
                .set('loading', true)
                .set('error', false);
        case AUTH_LOGIN_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('auth', action.payload);
        case AUTH_LOGIN_FAILED:
            return state
                .set('loading', false)
                .set('error', action.payload);
        case AUTH_LOGOUT:
            return state
                .set('loading', false)
                .set('error', false);
        case AUTH_FBLOGIN:
            return state
                .set('loading', true)
                .set('error', false);
        case FORGET_PASSWORD_REQUEST:
            return state
                .set('forgetLoading', true)
                .set('forgetError', false);
        case FORGET_PASSWORD_SUCCESS:
            return state
                .set('forgetLoading', false)
                .set('forgetError', false)
                .set('forget', action.payload);
        case FORGET_PASSWORD_FAILED:
            return state
                .set('forgetLoading', false)
                .set('forgetError', true)
                .set('forget', action.payload);
        case RESET_MESSAGE_REQUEST:
            return state
                .set('forget', {});
        default:
            return state;
    }
}

export default loginScreenReducer;
