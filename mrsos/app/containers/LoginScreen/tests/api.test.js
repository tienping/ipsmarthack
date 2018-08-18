
import { fromJS } from 'immutable';
import { getAuthToken } from '../api';

describe('LoginScreen api test', () => {
    describe('getAuthToken Action', () => {
        it('return object ', () => {
            expected = fromJS({
                "success": true,
                "messages": [
                    {
                        "type": "success",
                        "text": "Login successfully!"
                    }
                ],
                "token": "mock_user_auth_token"
            });
            expect(getAuthToken('tplim', 'xxxx')).toEqual(expected);
        });
    });
});
