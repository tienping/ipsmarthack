import { fromJS } from 'immutable';
import { selectLoginScreenDomain } from '../selectors';
import makeSelectLoginScreen from '../selectors'

describe('selectLoginDomain', () => {
    it('should select the Login domain', () => {
        const LoginState = fromJS({
        });
        const mockedState = fromJS({
            loginScreen: LoginState,
        });
        expect(selectLoginScreenDomain(mockedState)).toEqual(LoginState);
    });

    it('should select state', () => {
        const LoginSelect = makeSelectLoginScreen();
        const login = fromJS({});
        const mockedState = fromJS({
            loginScreen: {
                login,
            },
        });
        expect(LoginSelect(mockedState)).toEqual(login);
    });

});
