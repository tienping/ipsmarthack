/*
 *
 * UserProfileScreen reducer
 *
 */

import { fromJS } from 'immutable';
import { dataChecking } from 'utils/hermoUtils';

import {
    DEFAULT_ACTION,
    FETCH_USER_PROFILE,
    FETCH_USER_PROFILE_FAILED,
    FETCH_USER_PROFILE_SUCCESS,
    CLEAR_USER_PROFILE,
    FETCH_WISHLIST,
    FETCH_WISHLIST_SUCCESS,
    FETCH_WISHLIST_FAILED,
    WISHLIST_REQUEST,
    WISHLIST_SUCCESS, WISHLIST_FAILED,
} from './constants';

const initialState = fromJS({
    loading: false,
    wishlistLoading: false,
    error: null,
    profile: null,
    items: [],
    wishlisted: null,
    nextPage: null,
});
let nextPage;

function userProfileScreenReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;
        case FETCH_USER_PROFILE:
            return state
                .set('loading', true)
                .set('error', false);
        case FETCH_USER_PROFILE_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('profile', action.payload);
        case FETCH_USER_PROFILE_FAILED:
            return state
                .set('loading', false)
                .set('error', true);
        case CLEAR_USER_PROFILE:
            return initialState;

        case FETCH_WISHLIST:
            return state
                .set('loading', true)
                .set('error', false);
        case FETCH_WISHLIST_SUCCESS:
            if (dataChecking(action.payload, '_links', 'next', 'href')) {
                nextPage = action.payload._links.next.href;
            } else {
                nextPage = null;
            }
            return state
                .set('loading', false)
                .set('error', false)
                .set('nextPage', nextPage)
                .set('items', action.payload);
        case FETCH_WISHLIST_FAILED:
            return state
                .set('loading', false)
                .set('error', true);
        case WISHLIST_REQUEST:
            return state
                .set('wishlistRequestLoading', true)
                .set('id', action.id);
        case WISHLIST_SUCCESS:
            return state
                .set('wishlistRequestLoading', false)
                .set('id', action.id)
                .set('wishlisted', action.payload);
        case WISHLIST_FAILED:
            return state
                .set('wishlistRequestLoading', false)
                .set('wishlisted', action.payload);
        default:
            return state;
    }
}

export default userProfileScreenReducer;
