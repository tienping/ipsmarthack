import 'whatwg-fetch';

function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }

    try {
        return response.json();
    } catch (e) {
        return {
            success: false,
            messages: [{
                text: 'Please check your internet connection',
            }],
        };
    }
}

export default function request(url, options) {
    return fetch(url, options)
        .then(parseJSON)
        .catch(parseJSON);
}
