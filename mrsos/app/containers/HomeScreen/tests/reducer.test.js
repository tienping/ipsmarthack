import { fromJS } from 'immutable';
import homeScreenReducer from '../reducer';
import {
    defaultAction, fetchStore, fetchStoreFailed, fetchStoreSuccess, fetchTWOH, fetchTWOHFailed,
    fetchTWOHSuccess
} from '../actions'

describe('homeScreenReducer', () => {
    let state;
    const responseSuccess = fromJS({});
    const responseFailed = fromJS({ success: false });
    beforeEach(() => {
        state = fromJS({
            loading: false,
            error: false,
            store: {},
            twoh: {
                loading: false,
                result: {},
            },

        });
    });
    it('returns the initial state', () => {
        expect(homeScreenReducer(undefined, {})).toEqual(fromJS(state));
    });

    it('return the state when default action ', () => {
        expect(homeScreenReducer(state, defaultAction())).toEqual(state);
    });

    it('should show loading when fetching store', () => {
        const expected = state.set('loading', true).set('error', false);
        expect(homeScreenReducer(state, fetchStore())).toEqual(expected);
    });

    it('should set store with the correct response', () => {
        const expected = state.set('store', fromJS({}));
        expect(homeScreenReducer(state, fetchStoreSuccess(responseSuccess))).toEqual(expected);
    });

    it('should show error if store api failed', () => {
        state = fromJS({
            loading: false,
            error: true,
            store: {},
            twoh: {
                loading: false,
                result: {},
            },

        });
        const expected = state.set('error', true).set('store', responseFailed);
        expect(homeScreenReducer(state, fetchStoreFailed(responseFailed))).toEqual(expected);
    });

    it('should show loading when fetching twoh', () => {
        const expected = state.setIn(['twoh', 'loading'], true).set('error', false);
        expect(homeScreenReducer(state, fetchTWOH())).toEqual(expected);
    });

    it('should set twoh with the correct response', () => {
        const expected = state.set('twoh', fromJS({ loading: false, result: responseSuccess }));
        expect(homeScreenReducer(state, fetchTWOHSuccess(responseSuccess))).toEqual(expected);
    });

    it('should show error if twoh api failed', () => {
        state = fromJS({
            loading: false,
            error: true,
            store: {},
            twoh: {
                loading: false,
                result: {},
            },

        });
        const expected = state.set('twoh', fromJS({ loading: false, result: responseFailed }));
        expect(homeScreenReducer(state, fetchTWOHFailed(responseFailed))).toEqual(expected);
    });

});
