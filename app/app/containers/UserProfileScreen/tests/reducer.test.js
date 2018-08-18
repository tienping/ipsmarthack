
import { fromJS } from 'immutable';
import userProfileScreenReducer from '../reducer';

describe('userProfileScreenReducer', () => {
    it('returns the initial state', () => {
        expect(userProfileScreenReducer(undefined, {})).toEqual(fromJS({}));
    });
});
