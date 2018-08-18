/*
 *
 * PopupDialog reducer
 *
 */

import { fromJS } from 'immutable';
import { dataChecking } from 'utils/hermoUtils';
import {
    GET_API_DATA,
    GET_API_DATA_FAILED,
    GET_API_DATA_SUCCESS,
    GET_BUNDLE_DATA,
    GET_BUNDLE_DATA_FAILED,
    GET_BUNDLE_DATA_SUCCESS,
} from './constants';

const initialState = fromJS({
    loading: false,
    error: null,
    data: null,
});

function popupDialogReducer(state = initialState, action) {
    switch (action.type) {
        case GET_API_DATA:
        case GET_BUNDLE_DATA:
            return state
                .set('error', false)
                .set('loading', true);
        case GET_API_DATA_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', dataChecking(action, 'payload', 'data', 'content'));
        case GET_BUNDLE_DATA_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', dataChecking(action, 'payload', 'data', 'description'));
        case GET_API_DATA_FAILED:
        case GET_BUNDLE_DATA_FAILED:
            return state
                .set('loading', false)
                .set('error', true);
        default:
            return state;
    }
}

export default popupDialogReducer;
