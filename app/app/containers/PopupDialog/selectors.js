import { createSelector } from 'reselect';

/**
 * Direct selector to the popupDialog state domain
 */
const selectPopupDialogDomain = (state) => state.get('PopupDialog');

const getData = function getData(object, properties) {
    if (!properties || properties.length === 0) {
        return object;
    }

    const data = object.get(properties[0]);
    const newArr = properties.slice(1);

    return (newArr.length > 0 && data && data.get) ? getData(data, newArr) : data;
};

const makeSelectData = (layers) => createSelector(
    selectPopupDialogDomain,
    (substate) => getData(substate, layers).toJS()
);

const makeSelectPopupDialog = () => createSelector(
    selectPopupDialogDomain,
    (substate) => substate.toJS()
);
const makeSelectPopupDialogLoading = () => createSelector(
    selectPopupDialogDomain,
    (substate) => substate.get('loading')
);
const makeSelectPopupDialogError = () => createSelector(
    selectPopupDialogDomain,
    (substate) => substate.get('error')
);
const makeSelectPopupDialogData = () => createSelector(
    selectPopupDialogDomain,
    (substate) => substate.get('data')
);
export default makeSelectPopupDialog;
export {
    selectPopupDialogDomain,
    makeSelectData,
    makeSelectPopupDialogLoading,
    makeSelectPopupDialogError,
    makeSelectPopupDialogData
};
