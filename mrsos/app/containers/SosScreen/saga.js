import { apiRequest } from 'utils/hermoUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { CallAPI } from './constants';
import { globalScope } from '../../globalScope';

export function* callOneSignal() {
    const body = JSON.stringify({
        'app_id': '5391a370-3b55-4668-95ed-e44b42cc4bc2',
        'included_segments': ['All'],
        'data': { 'foo': 'bar' },
        'contents': { 'en': 'Help ME !!' },
        'android_sound': 'alarm',
    });
    const response = yield call(apiRequest, null, 'post', body, 'https://onesignal.com/api/v1/notifications');

    if (response && response.ok) {
        alert('success');
    } else {
        alert('failed');
    }
}
// Individual exports for testing
export default function* defaultSaga() {
    // See example in containers/HomePage/saga.js
    yield takeLatest(CallAPI, callOneSignal);

}
