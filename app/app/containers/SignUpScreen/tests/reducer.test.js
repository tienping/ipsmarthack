
import { fromJS } from 'immutable';
import signUpScreenReducer from '../reducer';

describe('signUpScreenReducer', () => {
    it('returns the initial state', () => {
        expect(signUpScreenReducer(undefined, {})).toEqual(fromJS({}));
    });
});
