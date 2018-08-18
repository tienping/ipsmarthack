/**
 * App Utilities
 */
import _ from 'lodash';
import { create } from 'apisauce';
import { NativeModules, Platform, Dimensions, PixelRatio, ToastAndroid } from 'react-native';
import { globalScope } from 'hermo/globalScope';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const addHeaderToAPI = (apiString, headerParams) => {
    const api = create({
        baseURL: apiString,
        headers: {
            'Authorization': 'Basic YmI2MjZjNmMtNjAzYi00MzVhLTljNzItZWVmY2NhZjFmM2Rj',
            'Content-Type': 'application/json',
            'Accept-Language': 'en',
            'api-version': '1.0.0',
            // 'app-version': DeviceInfo.getVersion(),
            'app-os-name': Platform.OS,
            'hertoken': globalScope.token,
            // 'app-os-version': DeviceInfo.getSystemVersion(),
        },
        timeout: 30000,
    });

    if (headerParams) {
        api.addAsyncRequestTransform((request) => async () => {
            NativeModules.RNAttributesService.getApiHeaderAttributes((error, headers) => {
                request.headers = { ...request.headers, ...headerParams };
            });
        });
    }

    return api;
};

export function mockupHeader() {
    const headerParams = {
        'x-hermo-one-signal-id': 'value',
        'x-hermo-one-device-token': 'value',
        'x-hermo-one-ads-id': 'value',
        'x-hermo-one-session-id': 'value',
        'x-hermo-one-app-id': 'value',
    };
    const apiObject = addHeaderToAPI(globalScope.api, headerParams);
    return apiObject.post('/');
}

export function apiRequest(path, type, body, url, headerParams) {
    if (!globalScope.isConnected) {
        herlert('Please check your connection.');
    }
    const apiObject = addHeaderToAPI(url || globalScope.api);
    return apiObject[type](path, body, headerParams);
}

export function staticErrorResponse(message) {
    return {
        success: false,
        messages: [message],
    };
}

export function dataChecking(object) {
    const args = Array.prototype.slice.call(arguments, 1);
    let obj = object;

    for (let i = 0; i < args.length; i += 1) {
        if (!obj || !Object.prototype.hasOwnProperty.call(obj, args[i])) {
            return null;
        }
        obj = obj[args[i]];
    }
    return obj;
}

export function getBannerHeight(imageProperty, width) {
    const imageHeight = imageProperty && imageProperty.height ? imageProperty.height : 280;// dataChecking(imageProperty, height)
    const imageWidth = imageProperty && imageProperty.width ? imageProperty.width : 560;

    return ((imageHeight / imageWidth) * width);
}

export function shuffleData(data) {
    return _.shuffle(data);
}

// to convert the  percentage of width to the dp;
// eg: getXdp(50)
export const getXdp = (percent) => PixelRatio.roundToNearestPixel((screenWidth * parseFloat(percent)) / 100);
// to convert the  percentage of height to the dp;
// eg: getYdp(50)
export const getYdp = (percent) => PixelRatio.roundToNearestPixel((screenHeight * parseFloat(percent)) / 100);

export function transfromViewWidthToPercentage(percentage) {
    return screenWidth * percentage;
}

export function transfromViewHeightToPercentage(percentage) {
    return screenHeight * percentage;
}

export function transfromViewHeightBasedOnColumn(sourceHeight, sourceWidth, column) {
    const viewWidth = screenWidth / column;
    const ratio = sourceHeight / sourceWidth;
    return viewWidth * ratio;
}

export function transfromViewHeightBasedOnColumnNScreenWidth(sWidth, sourceHeight, sourceWidth, column) {
    const viewWidth = sWidth / column;
    const ratio = sourceHeight / sourceWidth;
    return viewWidth * ratio;
}

export function transfromViewHeightBasedOnPercentage(sourceHeight, sourceWidth, percentage) {
    const viewWidth = screenWidth * percentage;
    const ratio = sourceHeight / sourceWidth;
    return viewWidth * ratio;
}

export function getFullScreenWidth() {
    return screenWidth;
}

export function getFullScreenHeight() {
    return screenHeight;
}

export function appLinkGenerator(target, page, href, id) {
    const applink = {
        target,
        type: '',
        id,
        page: {
            id: page,
            params: [
                {
                    key: 'url',
                    value: href,
                },
            ],
        },
    };

    return applink;
}

export const HerToast = {
    show: ({ text, type, duration, navigator }) => {
        if (Platform.OS === 'ios') {
            // type: info / warning / success / error
            const toastType = type === 'danger' ? 'error' : type;
            NativeModules.ToastHandler.alert(null, text, toastType);
        } else {
            navigator.showSnackbar({
                text,
                // actionText: 'done', // optional
                // actionId: 'fabClicked', // Mandatory if you've set actionText
                // actionColor: 'green', // optional
                textColor: 'white', // optional
                backgroundColor: (type === 'danger') ? 'red' : 'green', // optional
                duration: duration || 'short', // default is `short`. Available options: short, long, indefinite
            });
        }
    },
};

export function herlert(string) {
    if (Platform.OS === 'ios') {
        NativeModules.ToastHandler.alert(null, string, 'info');
    } else {
        ToastAndroid.show(string, ToastAndroid.LONG);
    }

    return true;
}
