/*
 *
 * LoginScreen actions
 *
 */

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
    AUTH_LOGOUT,
    AUTH_FBLOGIN,
    FORGET_PASSWORD_FAILED,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    RESET_MESSAGE_REQUEST,
} from './constants';

export const login = (username, password) => ({
    type: AUTH_LOGIN,
    payload: {
        username,
        password,
    },
});

export const loginFB = (id, token, email) => ({
    type: AUTH_FBLOGIN,
    payload: {
        id,
        token,
        email,
    },
});

export const loginSuccess = (key) => ({
    type: AUTH_LOGIN_SUCCESS,
    payload: {
        token: key,
    },
});

export const loginFail = (response) => ({
    type: AUTH_LOGIN_FAILED,
    payload: response,
});

export const logout = () => ({
    type: AUTH_LOGOUT,
});

export const forgetRequest = (email) => ({
    type: FORGET_PASSWORD_REQUEST,
    payload: {
        email,
    },
});

export const forgetSuccess = (response) => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: response,
});

export const forgetFailed = (response) => ({
    type: FORGET_PASSWORD_FAILED,
    payload: response,
});

export function resetMessage() {
    return {
        type: RESET_MESSAGE_REQUEST,
    };
}
