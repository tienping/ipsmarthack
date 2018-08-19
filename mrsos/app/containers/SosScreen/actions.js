/*
 *
 * SosScreen actions
 *
 */

import {
    CallAPI,
} from './constants';

export function pushOneSignal(la, long) {
    return {
        type: CallAPI,
        payload: {
            la,
            long,
        },
    };
}
