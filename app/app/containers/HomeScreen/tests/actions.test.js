
import {
    defaultAction, fetchStore, fetchStoreFailed, fetchStoreSuccess,
} from '../actions';
import {
    DEFAULT_ACTION, FETCH_STORE, FETCH_STORE_FAILED, FETCH_STORE_SUCCESS,
} from '../constants';

describe('HomeScreen actions', () => {
    describe('Default Action', () => {
        it('has a type of DEFAULT_ACTION', () => {
            const expected = {
                type: DEFAULT_ACTION,
            };
            expect(defaultAction()).toEqual(expected);
        });
    });

    describe('fetchStore action', () => {
        it('has a type of FETCH_STORE', () => {
            const expected = {
                type: FETCH_STORE,
            };
            expect(fetchStore()).toEqual(expected);
        });
    });

    describe('fetchStoreSuccess action', () => {
        it('has a type of fetchStoreSuccess', () => {
            const expected = {
                type: FETCH_STORE_SUCCESS,
            };
            expect(fetchStoreSuccess()).toEqual(expected);
        });
    });

    describe('fetchStoreFailed action', () => {
        it('has a type of FETCH_STORE_FAILED', () => {
            const expected = {
                type: FETCH_STORE_FAILED,
            };
            expect(fetchStoreFailed()).toEqual(expected);
        });
    });
});
