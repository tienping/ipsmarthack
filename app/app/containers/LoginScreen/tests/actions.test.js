
import {
    login,
    loginSuccess,
    loginFail,
    logout,
    logoutSuccess,
} from '../actions';
import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
    AUTH_LOGOUT,
    AUTH_LOGOUT_SUCCESS,
} from '../constants';

describe('LoginScreen actions', () => {
    describe('login Action', () => {
        it('has a type of AUTH_LOGIN', () => {
            const expected = {
                payload: {
                    username: 'username',
                    password: 'password',
                },
                type: AUTH_LOGIN,
            };
            expect(login(expected.payload.username, expected.payload.password)).toEqual(expected);
        });
    });
    
    describe('loginSuccess Action', () => {
        it('has a type of AUTH_LOGIN_SUCCESS', () => {
            const expected = {
                type: AUTH_LOGIN_SUCCESS,
            };
            expect(loginSuccess()).toEqual(expected);
        });
    });
    
    describe('loginFail Action', () => {
        it('has a type of AUTH_LOGIN_FAILED', () => {
            const expected = {
                type: AUTH_LOGIN_FAILED,
            };
            expect(loginFail()).toEqual(expected);
        });
    });
    
    describe('logout Action', () => {
        it('has a type of AUTH_LOGOUT', () => {
            const expected = {
                type: AUTH_LOGOUT,
            };
            expect(logout()).toEqual(expected);
        });
    });
    
    describe('logoutSuccess Action', () => {
        it('has a type of AUTH_LOGOUT_SUCCESS', () => {
            const expected = {
                type: AUTH_LOGOUT_SUCCESS,
            };
            expect(logoutSuccess()).toEqual(expected);
        });
    });
});
