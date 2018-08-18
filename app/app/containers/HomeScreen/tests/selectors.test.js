import { fromJS } from 'immutable';
import {
    makeSelectStore, makeSelectStoreLoading, makeSelectStoreTWOH, makeSelectStoreTWOHLoading, makeSelectStoreTWOHResult,
    selectHomeScreenDomain
} from '../selectors'

describe('selectAppDomain', () => {
    it('should select the App domain', () => {
        const HomeState = fromJS({
        });
        const mockedState = fromJS({
            homeScreen: HomeState,
        });
        expect(selectHomeScreenDomain(mockedState)).toEqual(HomeState);
    });

    it('should select store loading', () => {
        const storeLoading = makeSelectStoreLoading();
        const loading = fromJS({});
        const mockedState = fromJS({
            homeScreen: {
                loading,
            },
        });

        expect(storeLoading(mockedState)).toEqual(loading);
    });

    it('should select store', () => {
        const storeSelector = makeSelectStore();
        const store = fromJS({});
        const mockedState = fromJS({
            homeScreen: {
                store,
            },
        });

        expect(storeSelector(mockedState)).toEqual(store);
    });

    it('should select twoh', () => {
        const storeSelector = makeSelectStoreTWOH();
        const twoh = fromJS({});
        const mockedState = fromJS({
            homeScreen: {
                twoh,
            },
        });

        expect(storeSelector(mockedState)).toEqual(twoh);
    });

    it('should select twoh loading', () => {
        const storeSelector = makeSelectStoreTWOHLoading();
        const loading = fromJS({});
        const twoh = fromJS({
            loading,
        });
        const mockedState = fromJS({
            homeScreen: {
                twoh
            },
        });
        expect(storeSelector(mockedState)).toEqual(loading);
    });

    it('should select twoh result', () => {
        const storeSelector = makeSelectStoreTWOHResult();
        const result = fromJS({});
        const twoh = fromJS({
            result,
        });
        const mockedState = fromJS({
            homeScreen: {
                twoh,
            },
        });
        expect(storeSelector(mockedState)).toEqual(result);
    });
});
