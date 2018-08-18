/*
 *
 * SosScreen actions
 *
 */

import {
    CallAPI,
} from './constants';

export function pushOneSignal() {
    return {
        type: CallAPI,
    };
}
