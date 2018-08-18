import { createSelector } from 'reselect';

/**
 * Direct selector to the helperScreen state domain
 */
const selectHelperScreenDomain = (state) => state.get('helperScreen');

const getData = function getData(object, properties) {
    if (!properties || properties.length === 0) {
        return object;
    }

    const data = object.get(properties[0]);
    const newArr = properties.slice(1);

    return (newArr.length > 0 && data && data.get) ? getData(data, newArr) : data;
};

const makeSelectData = (layers) => createSelector(
    selectHelperScreenDomain,
    (substate) => getData(substate, layers).toJS()
);

const makeSelectHelperScreen = () => createSelector(
    selectHelperScreenDomain,
    (substate) => substate.toJS()
);

export default makeSelectHelperScreen;
export {
    selectHelperScreenDomain,
    makeSelectData,
};
