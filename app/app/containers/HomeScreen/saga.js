import { takeLatest, call, put } from 'redux-saga/effects';
import { readSchema, deleteSchema } from 'utils/realmStorage';
import { apiRequest } from 'utils/hermoUtils';
import { globalScope } from 'hermo/globalScope';
import { FETCH_STORE, FETCH_RECOMMENDED_PRODUCT, ATTENDANCE_REQUEST, FETCH_RECENTLY_VIEWED, CLEAR_RECENTLY_VIEWED } from './constants';
import {
    fetchStoreFailed, fetchStoreSuccess, attendanceSuccess, attendanceFailed,
    fetchRecentlyViewedSuccess, clearRecentlyViewedSuccess, fetchRecommendedProductSuccess, fetchRecommendedProductFailed,
} from './actions';

export function* getStoreData() {
    const response = yield call(apiRequest, '/app/store', 'get');
    if (response && response.ok && response.data) {
        yield put(fetchStoreSuccess(response.data));
    } else {
        yield put(fetchStoreFailed(response.data));
    }
}

export function* getAttendance() {
    const response = yield call(apiRequest, '/app/attendance', 'post');

    if (response && response.ok) {
        yield put(attendanceSuccess(response.data, globalScope.token));
    } else {
        yield put(attendanceFailed(response.data, globalScope.token));
    }
}

export function* getRecommendedProduct() {
    const response = yield call(apiRequest, `personalisation?platform=app&hertoken=${globalScope.token}`, 'get', null, 'https://reco.hermo.my/v2/');

    if (response && response.ok) {
        yield put(fetchRecommendedProductSuccess(response.data, globalScope.token));
    } else {
        yield put(fetchRecommendedProductFailed(response.data));
    }
}

export function* getRecentlyViewedData() {
    const res = yield call(readSchema, 'RecentlyViewed');
    yield put(fetchRecentlyViewedSuccess(res));
}

export function* clearRecentlyViewedData() {
    const res = yield call(deleteSchema, 'RecentlyViewed');
    yield put(clearRecentlyViewedSuccess(res));
}

export default function* storeSaga() {
    yield takeLatest(ATTENDANCE_REQUEST, getAttendance);
    yield takeLatest(FETCH_STORE, getStoreData);
    yield takeLatest(FETCH_RECOMMENDED_PRODUCT, getRecommendedProduct);
    yield takeLatest(FETCH_RECENTLY_VIEWED, getRecentlyViewedData);
    yield takeLatest(CLEAR_RECENTLY_VIEWED, clearRecentlyViewedData);
}
