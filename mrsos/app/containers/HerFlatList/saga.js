import { apiRequest } from 'utils/hermoUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_NEXT_PAGE } from './constants'
import { fetchNextPageFailed, fetchNextPageSuccess } from './actions'

export function* fetchNextPage(action) {
    const response = yield call(apiRequest, null, 'get', {}, action.nextPageUrl);

    if (response && response.ok) {
        yield put(fetchNextPageSuccess(response.data, action.flatListId));
    } else {
        yield put(fetchNextPageFailed(response.data));
    }
}
// Individual exports for testing
export default function* defaultSaga() {
    // See example in containers/HomePage/saga.js
    yield takeLatest(FETCH_NEXT_PAGE, fetchNextPage);

}
