/*
/*
 *
 * HerFlatList reducer
 *
 */

import { fromJS } from 'immutable';
import { dataChecking } from 'utils/hermoUtils';
import {
    SET_INIT_ITEM, FETCH_NEXT_PAGE, FETCH_NEXT_PAGE_FAILED, FETCH_NEXT_PAGE_SUCCESS,
} from './constants';

const initialState = fromJS({
    loading: false,
    error: false,
    nextPageUrl: null,
    dbStore: {},
});
let currentStore;
let newStore;
let currentItems;
let newItems;
let nextPageUrl;

function herFlatListReducer(state = initialState, action) {
    switch (action.type) {
        case SET_INIT_ITEM:
            currentStore = (action.retainData && state.get('dbStore').get(action.flatListId)) || {
                nextPageUrl: action.nextPageUrl,
                data: action.data,
            };

            return state
                .set('loading', false)
                .setIn(['dbStore', action.flatListId], currentStore);
        case FETCH_NEXT_PAGE:
            return state
                .set('loading', true);
        case FETCH_NEXT_PAGE_SUCCESS:
            currentStore = state.get('dbStore').get(action.flatListId);
            currentItems = currentStore.data;
            newStore = {
                nextPageUrl: dataChecking(action, 'payload', '_links', 'next', 'href') ? action.payload._links.next.href : null,
                data: action.data,
            };
            if (currentItems) {
                if (dataChecking(action, 'payload', '_links', 'next', 'href') === currentStore.nextPageUrl) {
                    newStore = currentStore;
                } else {
                    newStore = {
                        nextPageUrl: dataChecking(action, 'payload', '_links', 'next', 'href') ? action.payload._links.next.href : null,
                        data: currentItems.concat(action.payload.items),
                    };
                }
            }

            return state
                .set('loading', false)
                .setIn(['dbStore', action.flatListId], newStore);
        case FETCH_NEXT_PAGE_FAILED:
            return state
                .set('loading', false)
                .set('error', true);
        default:
            return state;
    }
}

export default herFlatListReducer;
