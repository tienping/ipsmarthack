import { createSelector } from 'reselect';

/**
 * Direct selector to the herFlatList state domain
 */
const selectHerFlatListDomain = (state) => state.get('herFlatList');

const getData = function getData(object, properties) {
    if (!properties || properties.length === 0) {
        return object;
    }

    const data = object.get(properties[0]);
    const newArr = properties.slice(1);

    return (newArr.length > 0 && data && data.get) ? getData(data, newArr) : data;
};

const makeSelectData = (layers) => createSelector(
    selectHerFlatListDomain,
    (substate) => getData(substate, layers).toJS()
);

const makeSelectHerFlatList = () => createSelector(
    selectHerFlatListDomain,
    (substate) => substate.toJS()
);
const makeSelectHerFlatListLoading = () => createSelector(
    selectHerFlatListDomain,
    (substate) => substate.get('loading')
);
const makeSelectHerFlatListDbStore = () => createSelector(
    selectHerFlatListDomain,
    (substate) => substate.get('dbStore').toJS()
);

export default makeSelectHerFlatList;
export {
    selectHerFlatListDomain,
    makeSelectData,
    makeSelectHerFlatListLoading,
    makeSelectHerFlatListDbStore,
};
