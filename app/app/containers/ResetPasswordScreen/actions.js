/*
 *
 * ResetPasswordScreen actions
 *
 */

import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from './constants';

export const resetPasswordRequest = (currentPassword, newPassword, newConfirmPassword) => ({
    type: RESET_PASSWORD_REQUEST,
    source: {
        currentPassword,
        newPassword,
        newConfirmPassword,
    },
});

export const resetPasswordSuccess = (response) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: {
        response,
    },
});

export const resetPasswordFailed = (response) => ({
    type: RESET_PASSWORD_FAILED,
    payload: {
        response,
    },
});
