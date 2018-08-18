import { createSelector } from 'reselect';

/**
 * Direct selector to the sosScreen state domain
 */
const selectSosScreenDomain = (state) => state.get('sosScreen');

const getData = function getData(object, properties) {
    if (!properties || properties.length === 0) {
        return object;
    }

    const data = object.get(properties[0]);
    const newArr = properties.slice(1);

    return (newArr.length > 0 && data && data.get) ? getData(data, newArr) : data;
};

const makeSelectData = (layers) => createSelector(
    selectSosScreenDomain,
    (substate) => getData(substate, layers).toJS()
);

const makeSelectSosScreen = () => createSelector(
    selectSosScreenDomain,
    (substate) => substate.toJS()
);

export default makeSelectSosScreen;
export {
    selectSosScreenDomain,
    makeSelectData,
};
