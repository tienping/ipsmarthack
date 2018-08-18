import { createSelector } from 'reselect';

/**
 * Direct selector to the resetPasswordScreen state domain
 */
const selectResetPasswordScreenDomain = (state) => state.get('resetPasswordScreen');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ResetPasswordScreen
 */

const makeSelectResetPasswordScreen = () => createSelector(
    selectResetPasswordScreenDomain,
    (substate) => substate.toJS()
);

const selectResetData = () => createSelector(
    selectResetPasswordScreenDomain,
    (substate) => substate.get('reset')
);

const selectResetLoading = () => createSelector(
    selectResetPasswordScreenDomain,
    (substate) => substate.get('resetLoading')
);

const selectResetError = () => createSelector(
    selectResetPasswordScreenDomain,
    (substate) => substate.get('resetError')
);

export default makeSelectResetPasswordScreen;
export {
    selectResetPasswordScreenDomain,
    selectResetData,
    selectResetError,
    selectResetLoading,
};
