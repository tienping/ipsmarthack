import { apiRequest } from 'utils/hermoUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import {
    writeSchema,
} from 'utils/realmStorage';
import { errorLog } from 'utils/errorService';
import { globalScope } from 'hermo/globalScope';
import { signUpFailed, signUpSuccess } from './actions';
import { SIGN_UP_REQUEST } from './constants';

export function* doSignUp(action) {

    // TODO: loginin mock up handling
    // realm set token = xxxx

    // const { email, password, password_confirmation } = action.payload;
    // if (email === '' || password === '' || password_confirmation === '') {
    //     yield put(signUpFailed('Username and Password cannot be empty !'));
    // } else {
    //     try {
    //         const response = yield call(apiRequest, '/app/register', 'post', { email, password, password_confirmation});
    //         if (response.ok && response.data.success) {
    //             const schemaObj = { token: response.data.token, debuggerMode: false };
    //             globalScope.token = response.data.token;

    //             const isAdminResponse = yield call(apiRequest, '/view/preview/1', 'post');
    //             schemaObj.isAdmin = !!(isAdminResponse && isAdminResponse.data && isAdminResponse.data.id);
    //             globalScope.isAdmin = schemaObj.isAdmin;

    //             yield call(writeSchema, 'Auth', schemaObj);
    //             yield put(signUpSuccess(response.data.token));
    //         } else {
    //             yield put(signUpFailed(response.data));
    //         }
    //     } catch (error) {
    //         errorLog('SignUpFailed: ', error);
    //         yield put(signUpFailed(error));
    //     }
    // }
}

export default function* SignUpSaga() {
    yield takeLatest(SIGN_UP_REQUEST, doSignUp);
}
