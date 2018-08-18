import { apiRequest } from 'utils/hermoUtils';
import { call, put, takeLatest } from 'redux-saga/effects';
import { RESET_PASSWORD_REQUEST } from './constants';
import {
    resetPasswordSuccess,
    resetPasswordFailed,
} from './actions';
// Individual exports for testing

export function* passwordRequest(action) {
    const formData = new FormData(action);
    formData.append('current_password', action.source.currentPassword);
    formData.append('password', action.source.newPassword);
    formData.append('password_confirmation', action.source.newConfirmPassword);
    const response = yield call(apiRequest, '/app/password/change', 'post', formData);
    if (response && response.ok) {
        yield put(resetPasswordSuccess(response.data));
    } else {
        yield put(resetPasswordFailed(response.data));
    }
}


export default function* defaultSaga() {
    // See example in containers/HomePage/saga.js
    yield takeLatest(RESET_PASSWORD_REQUEST, passwordRequest);
}
