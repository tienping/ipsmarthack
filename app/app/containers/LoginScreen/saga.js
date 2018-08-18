import { apiRequest } from 'utils/hermoUtils';
import { globalScope } from 'hermo/globalScope';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
    writeSchema,
    deleteSchema,
} from 'utils/realmStorage';
import { errorLog } from 'utils/errorService';

import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_FBLOGIN,
    FORGET_PASSWORD_REQUEST,
} from './constants';
import {
    loginFail,
    loginSuccess,
    forgetFailed,
    forgetSuccess,
} from './actions';

export function* doLogin(action) {
    const { username, password } = action.payload;
    try {
        const base64 = require('base-64');
        const hash = base64.encode(`${username}:${password}`);
        const response = yield call(apiRequest, 'auth/token', 'post', {}, null, { headers: { 'Authorization': `Basic ${hash}` } });
        if (response && response.ok) {
            const schemaObj = { token: response.data.token, debuggerMode: false };
            globalScope.token = response.data.token;

            const isAdminResponse = yield call(apiRequest, '/view/preview/1', 'post');
            schemaObj.isAdmin = !!(isAdminResponse && isAdminResponse.data && isAdminResponse.data.id);
            globalScope.isAdmin = schemaObj.isAdmin;
            globalScope.loginWithFacebook = false;

            yield call(writeSchema, 'Auth', schemaObj);
            yield put(loginSuccess(response.data.token));
        } else {
            yield put(loginFail(response.data));
        }
    } catch (error) {
        errorLog('loginFail: ', error);
        yield put(loginFail(error));
    }
}

export function* doFBLogin(action) {
    const { id, token, email } = action.payload;
    const body = JSON.stringify({
        id,
        token,
        email,
    });
    const response = yield call(apiRequest, '/app/facebook', 'post', body);
    if (response.ok && response.ok) {
        const schemaObj = { token: response.data.token, debuggerMode: false };
        globalScope.token = response.data.token;

        const isAdminResponse = yield call(apiRequest, '/view/preview/1', 'post');
        schemaObj.isAdmin = !!(isAdminResponse && isAdminResponse.data && isAdminResponse.data.id);
        globalScope.isAdmin = schemaObj.isAdmin;
        globalScope.loginWithFacebook = true;

        yield call(writeSchema, 'Auth', schemaObj);
        yield put(loginSuccess(response.data.token));
    } else {
        yield put(loginFail(response));
    }
}

export function* doLogout() {
    yield call(deleteSchema('Auth'));
}


export function* forgetRequest(action) {
    const formData = new FormData(action);
    formData.append('email', action.payload.email);
    const response = yield call(apiRequest, '/app/password/reset', 'post', formData);
    if (response.ok && response.ok) {
        yield put(forgetSuccess(response.data));
    } else {
        yield put(forgetFailed(response.data));
    }
}

export default function* loginSaga() {
    yield takeLatest(AUTH_LOGOUT, doLogout);
    yield takeLatest(AUTH_LOGIN, doLogin);
    yield takeLatest(AUTH_FBLOGIN, doFBLogin);
    yield takeLatest(FORGET_PASSWORD_REQUEST, forgetRequest);
}
