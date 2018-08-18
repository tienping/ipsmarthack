import { createSelector } from 'reselect';

/**
 * Direct selector to the signUpScreen state domain
 */
const selectSignUpScreenDomain = (state) => state.get('signUpScreen');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SignUpScreen
 */

const makeSelectSignUpScreen = () => createSelector(
    selectSignUpScreenDomain,
    (substate) => substate.toJS()
);

const makeSelectSignUpScreenAuth = () => createSelector(
    selectSignUpScreenDomain,
    (substate) => substate.get('auth')
);

export default makeSelectSignUpScreen;
export {
    selectSignUpScreenDomain,
    makeSelectSignUpScreenAuth,
};
