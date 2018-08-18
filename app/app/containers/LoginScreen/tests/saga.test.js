/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
import  defaultSaga  from '../saga';

describe('defaultSaga Saga', () => {
    it('Expect to have unit tests specified', () => {
        let generator = defaultSaga();
        const selectDescriptor = generator.next().value;
        expect(selectDescriptor).toMatchSnapshot();

    });
});
