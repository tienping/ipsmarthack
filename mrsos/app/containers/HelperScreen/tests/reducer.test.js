
import { fromJS } from 'immutable';
import helperScreenReducer from '../reducer';

describe('helperScreenReducer', () => {
    it('returns the initial state', () => {
        expect(helperScreenReducer(undefined, {})).toEqual(fromJS({}));
    });
});
