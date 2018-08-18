import { createSelector } from 'reselect';

/**
 * Direct selector to the userProfileScreen state domain
 */
const selectUserProfileScreenDomain = (state) => state.get('userProfileScreen');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserProfileScreen
 */
const makeSelectUserProfileLoading = () => createSelector(
    selectUserProfileScreenDomain,
    (substate) => substate.get('loading')
);

const makeSelectUserProfile = () => createSelector(
    selectUserProfileScreenDomain,
    (substate) => substate && substate.get('profile')
);

const makeSelectWishlistLoading = () => createSelector(
    selectUserProfileScreenDomain,
    (substate) => substate.get('loading')
);
const makeSelectWishlistRequestLoading = () => createSelector(
    selectUserProfileScreenDomain,
    (substate) => substate.get('wishlistRequestLoading')
);
const makeSelectWishlistItems = () => createSelector(
    selectUserProfileScreenDomain,
    (substate) => substate.get('items')
);
const makeSelectDeleteWishListWishlisted = () => createSelector(
    selectUserProfileScreenDomain,
    (substate) => substate.get('wishlisted')
);
const makeSelectDeleteWishListNextPage = () => createSelector(
    selectUserProfileScreenDomain,
    (substate) => substate.get('nextPage')
);
const test = () => true;

export {
    makeSelectUserProfileLoading,
    makeSelectUserProfile,
    test,
    makeSelectWishlistLoading,
    makeSelectWishlistItems,
    makeSelectDeleteWishListWishlisted,
    makeSelectDeleteWishListNextPage,
    makeSelectWishlistRequestLoading,
};
