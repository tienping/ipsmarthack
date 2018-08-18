import { apiRequest } from 'utils/hermoUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import {
    writeSchema,
    deleteSchema,
} from 'utils/realmStorage';
import { listingRequest } from 'containers/DynamicListingScreen/actions';
import { FETCH_USER_PROFILE, UPDATE_REALM, FETCH_WISHLIST, WISHLIST_REQUEST } from './constants';
import {
    fetchUserProfileFailed,
    fetchUserProfileSuccess,
    fetchWishListSuccess,
    fetchWishListFailed,
    wishlistFailed,
    wishlistSuccess,
    fetchWishList,
} from './actions';

export function* getUserProfileData() {
    const response = yield call(apiRequest, '/app/profile', 'get');
    if (response && response.ok) {
        yield put(fetchUserProfileSuccess(response.data));
    } else {
        yield put(fetchUserProfileFailed(response.data));
    }
}

export function* updateRealmData(payload) {
    yield call(deleteSchema, payload.params.realmKey);
    yield call(writeSchema, payload.params.realmKey, payload.params.schemaObj);
}

export function* getWishlistData() {
    const response = yield call(apiRequest, '/app/wishlist', 'get');

    if (response && response.success !== false) {
        yield put(fetchWishListSuccess(response.data));
    } else {
        yield put(fetchWishListFailed(response.data));
    }
}

export function* addWishlistData(action) {
    const response = yield call(apiRequest, `/app/wishlist/${action.id}`, 'post');

    if (response && response.ok && response.success !== false) {
        yield put(wishlistSuccess(response.data));
        if (action.pageID) {
            yield put(fetchWishList());
        }
        if (action.href) {
            yield put(listingRequest(action.href));
        }
    } else {
        yield put(wishlistFailed(response.data));
    }
}
export default function* userProfileSaga() {
    yield takeLatest(FETCH_USER_PROFILE, getUserProfileData);
    yield takeLatest(UPDATE_REALM, updateRealmData);
    yield takeLatest(FETCH_WISHLIST, getWishlistData);
    yield takeLatest(WISHLIST_REQUEST, addWishlistData);
}
