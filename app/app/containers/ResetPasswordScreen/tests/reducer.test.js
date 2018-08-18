
import { fromJS } from 'immutable';
import resetPasswordScreenReducer from '../reducer';

describe('resetPasswordScreenReducer', () => {
    it('returns the initial state', () => {
        expect(resetPasswordScreenReducer(undefined, {})).toEqual(fromJS({}));
    });
});
