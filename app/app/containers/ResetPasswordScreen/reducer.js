/*
 *
 * ResetPasswordScreen reducer
 *
 */

import { fromJS } from 'immutable';
import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,

} from './constants';

const initialState = fromJS({
    reset: {},
    resetLoading: false,
    resetError: false,
});

function resetPasswordScreenReducer(state = initialState, action) {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return state
                .set('resetLoading', true)
                .set('resetError', false);
        case RESET_PASSWORD_SUCCESS:
            return state
                .set('resetLoading', false)
                .set('resetError', false)
                .set('reset', action.payload);
        case RESET_PASSWORD_FAILED:
            return state
                .set('resetLoading', false)
                .set('resetError', action.payload);
        default:
            return state;
    }
}

export default resetPasswordScreenReducer;
