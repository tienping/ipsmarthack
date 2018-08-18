/*
 *
 * HerFlatList actions
 *
 */

import {
    SET_INIT_ITEM, FETCH_NEXT_PAGE, FETCH_NEXT_PAGE_FAILED, FETCH_NEXT_PAGE_SUCCESS,
} from './constants';

export function setInitItem({ nextPageUrl, data, flatListId, retainData }) {
    return {
        type: SET_INIT_ITEM,
        nextPageUrl,
        data,
        flatListId,
        retainData,
    };
}

export function fetchNextPage({ flatListId, nextPageUrl }) {
    return {
        type: FETCH_NEXT_PAGE,
        flatListId,
        nextPageUrl,
    };
}

export function fetchNextPageSuccess(response, flatListId) {
    return {
        type: FETCH_NEXT_PAGE_SUCCESS,
        payload: response,
        flatListId,
    };
}

export function fetchNextPageFailed(response, url) {
    return {
        type: FETCH_NEXT_PAGE_FAILED,
        payload: response,
        url,
    };
}
