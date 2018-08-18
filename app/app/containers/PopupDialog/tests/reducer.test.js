
import { fromJS } from 'immutable';
import popupDialogReducer from '../reducer';

describe('popupDialogReducer', () => {
    it('returns the initial state', () => {
        expect(popupDialogReducer(undefined, {})).toEqual(fromJS({}));
    });
});
