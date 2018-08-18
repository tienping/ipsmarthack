import configureStore from '../configureStore';
import { createStore, applyMiddleware, compose } from 'redux';
import { Platform } from 'react-native';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import devTools from 'remote-redux-devtools';
import createReducer from '../reducers';

describe('Configure Store', () => {
    let store;

    beforeEach(() => {
        store = configureStore({});
    });

    describe('injectedReducers', () => {
        it('should contain an object for reducers', () => {
            expect(typeof store.injectedReducers).toBe('object');
        });
    });

    describe('injectedSagas', () => {
        it('should contain an object for sagas', () => {
            expect(typeof store.injectedSagas).toBe('object');
        });
    });

    describe('runSaga', () => {
        it('should contain a hook for `sagaMiddleware.run`', () => {
            expect(typeof store.runSaga).toBe('function');
        });
    });

    it('should return store', () => {
        const sagaMiddleware = createSagaMiddleware();

        const middlewares = [
            sagaMiddleware,
        ];
        const enhancers = [
            applyMiddleware(...middlewares),
            devTools({
                name: 'Hermo ' + Platform.OS,
                hostname: 'localhost',
                port: 5678,
            })
        ];
        const expected = createStore(
            createReducer(),
            fromJS(undefined),
            compose(...enhancers)
        );

        expected.runSaga = sagaMiddleware.run;
        expected.injectedReducers = {}; // Reducer registry
        expected.injectedSagas = {}; // Saga registry

        expect(configureStore(undefined).getState()).toEqual(expected.getState());
    });

});
