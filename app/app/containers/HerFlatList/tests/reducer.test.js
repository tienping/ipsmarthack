
import { fromJS } from 'immutable';
import herFlatListReducer from '../reducer';

describe('herFlatListReducer', () => {
    it('returns the initial state', () => {
        expect(herFlatListReducer(undefined, {})).toEqual(fromJS({}));
    });
});
