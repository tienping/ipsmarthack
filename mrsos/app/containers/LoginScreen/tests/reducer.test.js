import { fromJS } from 'immutable';
import loginScreenReducer from '../reducer';
import {
    login,
    loginSuccess,
    loginFail,
    logout,
    logoutSuccess
} from './../actions';

import { initialState } from './../reducer';

let expected;
describe('homeScreenReducer', () => {
    it('returns the initial state', () => {
        expect(loginScreenReducer(undefined, {})).toEqual(initialState);
    });

    it('return the state when login action ', () => {
        expected = initialState;
        expected.set('loading', true).set('error', false);
        expect(loginScreenReducer(initialState, login('username', 'password'))).toEqual(expected);
    });

    it('return the state when loginSuccess action ', () => {
        expected = initialState;
        expected.set('loading', false).set('error', false).set('auth', { 'token': 'mock_up_token_string' });
        expect(loginScreenReducer(initialState, loginSuccess('mock_up_token_string'))).toEqual(expected);
    });

    it('return the state when loginFail action ', () => {
        expected = initialState;
        expected.set('loading', false).set('error', 'errorMsg');
        expect(loginScreenReducer(initialState, loginFail('errorMsg'))).toEqual(expected);
    });
    
    it('return the state when logout action ', () => {
        expected = initialState;
        expected.set('loading', true).set('error', false);
        expect(loginScreenReducer(initialState, logout())).toEqual(expected);
    });

    it('return the state when logoutSuccess action ', () => {
        expected = initialState;
        expected.set('loading', false).set('error', false);
        expect(loginScreenReducer(initialState, logoutSuccess())).toEqual(expected);
    });
});
