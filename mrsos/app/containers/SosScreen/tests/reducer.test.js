
import { fromJS } from 'immutable';
import sosScreenReducer from '../reducer';

describe('sosScreenReducer', () => {
    it('returns the initial state', () => {
        expect(sosScreenReducer(undefined, {})).toEqual(fromJS({}));
    });
});
