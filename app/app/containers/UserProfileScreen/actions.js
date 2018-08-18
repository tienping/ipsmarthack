/*
 *
 * UserProfileScreen actions
 *
 */

import
{
    FETCH_USER_PROFILE,
    FETCH_USER_PROFILE_FAILED,
    FETCH_USER_PROFILE_SUCCESS,
    CLEAR_USER_PROFILE,
    UPDATE_REALM,
    FETCH_WISHLIST,
    FETCH_WISHLIST_FAILED,
    FETCH_WISHLIST_SUCCESS,
    WISHLIST_REQUEST,
    WISHLIST_SUCCESS,
    WISHLIST_FAILED,
} from './constants';


export function fetchUserProfile() {
    return {
        type: FETCH_USER_PROFILE,
    };
}

export function fetchUserProfileSuccess(response) {
    return {
        type: FETCH_USER_PROFILE_SUCCESS,
        payload: response,
    };
}

export function fetchUserProfileFailed(response) {
    return {
        type: FETCH_USER_PROFILE_FAILED,
        payload: response,
    };
}

export function clearUserProfile() {
    return {
        type: CLEAR_USER_PROFILE,
    };
}

export function updateRealm(params) {
    return {
        type: UPDATE_REALM,
        params,
    };
}

export function fetchWishList() {
    return {
        type: FETCH_WISHLIST,
    };
}

export function fetchWishListSuccess(response) {
    return {
        type: FETCH_WISHLIST_SUCCESS,
        payload: response,
    };
}

export function fetchWishListFailed(response) {
    return {
        type: FETCH_WISHLIST_FAILED,
        payload: response,
    };
}

export function wishlistRequest(id, href, pageID) {
    return {
        type: WISHLIST_REQUEST,
        id,
        href,
        pageID,
    };
}

export function wishlistSuccess(payload) {
    return {
        type: WISHLIST_SUCCESS,
        payload,
    };
}

export function wishlistFailed(payload) {
    return {
        type: WISHLIST_FAILED,
        payload,
    };
}
