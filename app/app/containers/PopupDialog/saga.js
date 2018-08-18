import { apiRequest } from 'utils/hermoUtils';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_API_DATA, GET_BUNDLE_DATA } from './constants'
import { getApiDataFailed, getApiDataSuccess, getBundleDataFailed, getBundleDataSuccess } from './actions'

export function* getApiData(action) {
    const response = yield call(apiRequest, null, 'get', {}, action.url);

    if (response && response.ok) {
        yield put(getApiDataSuccess(response));
    } else {
        yield put(getApiDataFailed(response));
    }
}

export function* getBundleData(action) {
    const response = yield call(apiRequest, `/app/bundle/${action.bundleID}/product/${action.productID}`, 'get');

    if (response && response.ok) {
        yield put(getBundleDataSuccess(response));
    } else {
        yield put(getBundleDataFailed(response));
    }
}

export default function* defaultSaga() {
    yield takeLatest(GET_API_DATA, getApiData);
    yield takeLatest(GET_BUNDLE_DATA, getBundleData);
}

