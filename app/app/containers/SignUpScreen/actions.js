/*
 *
 * SignUpScreen actions
 *
 */

import {
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILED,
} from './constants';

export function signUpRequest(email, password, password_confirmation) {
    return {
        type: SIGN_UP_REQUEST,
        payload: {
            email, password, password_confirmation,
        },
    };
}

export function signUpSuccess(response) {
    return {
        type: SIGN_UP_SUCCESS,
        payload: response,
    };
}

export function signUpFailed(response) {
    return {
        type: SIGN_UP_FAILED,
        payload: response,
    };
}
