/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Platform } from 'react-native';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import devTools from 'remote-redux-devtools';
import { Client } from 'bugsnag-react-native';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const bugsnag = new Client('d37792ed3f8c68b62dd998e9f1e247bc');

export default function configureStore(initialState = {}, history) {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [
        sagaMiddleware,
    ];

    // const enhancers = [
    //     applyMiddleware(...middlewares),
    //     devTools({
    //         name: `Hermo ${Platform.OS}`,
    //         hostname: 'localhost',
    //         port: 5678,
    //     }),
    // ];

    const store = createStore(
        createReducer(),
        fromJS(initialState),
        // compose(...enhancers)
        composeWithDevTools(applyMiddleware(...middlewares)),
    );

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry

    return store;
}

