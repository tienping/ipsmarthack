import request from 'utils/request';
import { globalScope } from 'hermo/globalScope';
import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchGetCommonDataFailed, fetchGetCommonDataSuccess } from './actions';
import { FETCH_GET_COMMON_DATA } from './constants';

const COMMON_DATA_URL = `${globalScope.api}/app/common`;

export function* getCommonData() {
    const response = yield call(request, COMMON_DATA_URL);

    if (response && response.success !== false) {
        yield put(fetchGetCommonDataSuccess(response));
    } else {
        yield put(fetchGetCommonDataFailed(response));
    }
}
export default function* splashSaga() {
    yield takeLatest(FETCH_GET_COMMON_DATA, getCommonData);
}
