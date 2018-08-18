import { createSelector } from 'reselect';

/**
 * Direct selector to the loginScreen state domain
 */
const selectLoginScreenDomain = (state) => state.get('loginScreen');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginScreen
 */

const makeSelectLoginScreen = () => createSelector(
    selectLoginScreenDomain,
    (substate) => substate.get('login')
);

const makeSelectLoginScreenLoading = () => createSelector(
    selectLoginScreenDomain,
    (substate) => substate.get('loading')
);

const makeSelectLoginError = () => createSelector(
    selectLoginScreenDomain,
    (substate) => substate.get('error')
);

const makeSelectLoginScreenForget = () => createSelector(
    selectLoginScreenDomain,
    (substate) => substate.get('forget')
);

const makeSelectLoginScreenForgetLoading = () => createSelector(
    selectLoginScreenDomain,
    (substate) => substate.get('forgetLoading')
);

const makeSelectLoginScreenForgetError = () => createSelector(
    selectLoginScreenDomain,
    (substate) => substate.get('forgetError')
);

const makeSelectLoginScreenAuth = () => createSelector(
    selectLoginScreenDomain,
    (substate) => substate.get('auth')
);

export default makeSelectLoginScreen;
export {
    selectLoginScreenDomain,
    makeSelectLoginScreenLoading,
    makeSelectLoginError,
    makeSelectLoginScreenForget,
    makeSelectLoginScreenForgetError,
    makeSelectLoginScreenForgetLoading,
    makeSelectLoginScreenAuth,
};
