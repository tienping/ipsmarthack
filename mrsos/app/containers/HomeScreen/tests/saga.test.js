/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import storeSaga, { getStoreData, getTWOHData } from '../saga';
import { FETCH_STORE, FETCH_TWOH } from '../constants';
import { fetchStoreFailed, fetchStoreSuccess, fetchTWOHFailed, fetchTWOHSuccess } from '../actions';

const responseSuccess = { items: [] };
const responseFailed = { success: false };

describe('getStoreData Saga', () => {
    let generator;
    beforeEach(() => {
        generator = getStoreData();
        const selectDescriptor = generator.next().value;
        expect(selectDescriptor).toMatchSnapshot();
    });

    it('should dispatch the fetchStoreSuccess if the call is successful', () => {
        const putDescriptor = generator.next(responseSuccess).value;
        expect(putDescriptor).toEqual(put(fetchStoreSuccess(responseSuccess)));
    });

    it('should dispatch the fetchStoreFailed if API returned error', () => {
        const putDescriptor = generator.next(responseFailed).value;
        expect(putDescriptor).toEqual(put(fetchStoreFailed(responseFailed)));
    });
});

describe('getTWOHData Saga', () => {
    let generator;
    beforeEach(() => {
        generator = getTWOHData();
        const selectDescriptor = generator.next().value;
        expect(selectDescriptor).toMatchSnapshot();
    });

    it('should dispatch the fetchTWOHSuccess if the call is successful', () => {
        const putDescriptor = generator.next(responseSuccess).value;
        expect(putDescriptor).toEqual(put(fetchTWOHSuccess(responseSuccess)));
    });

    it('should dispatch the fetchTWOHFailed if API returned error', () => {
        const putDescriptor = generator.next(responseFailed).value;
        expect(putDescriptor).toEqual(put(fetchTWOHFailed(responseFailed)));
    });
});

describe('storeSaga', () => {
    const generator = storeSaga();

    it('should start watching FETCH_STORE action', () => {
        const latestDescriptor = generator.next().value;
        expect(latestDescriptor).toEqual(takeLatest(FETCH_STORE, getStoreData));
    });
    it('should start watching FETCH_TWOH action', () => {
        const latestDescriptor = generator.next().value;
        expect(latestDescriptor).toEqual(takeLatest(FETCH_TWOH, getTWOHData));
    });
});
