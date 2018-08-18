/**
 * Test injectors
 */

import {
    dataChecking, getBannerHeight,
    staticErrorResponse,
} from '../hermoUtils';

describe('staticErrorResponse()', () => {
    it('should return message passed into messages array', () => {
        const message = { text: 'Testing error' };
        const mock = {
            success: false,
            messages: [message],
        };
        expect(staticErrorResponse(message)).toEqual(mock);
    });
});

describe('dataChecking()', () => {
    let expectedResponse;
    let mockData;
    beforeEach(() => {
        expectedResponse = [];
        mockData = {
            banner: {
                items: expectedResponse,
            },
        };
    });

    it('should return object when it property being passed is exist', () => {
        expect(dataChecking(mockData.banner, 'items')).toEqual(expectedResponse);
    });

    it('should return false when the property doesnt exist', () => {
        expect(dataChecking(mockData.banner, 'item')).toEqual(false);
    });
});

describe('getBannerHeight()', () => {
    let h;
    let w;
    let data;
    let mockWidth;

    beforeEach(() => {
        h = 200;
        w = 200;
        mockWidth = 300;
        data = {
            height: h,
            width: w,
        };
    });

    it('should return height of image when height is exist', () => {
        expect(data.height).toEqual(h);
    });

    it('should return 280 as image height when height does not exist', () => {
        data = {
            width: w,
        };
        const mockData = {
            height: 280,
            width: w,
        };
        expect(getBannerHeight(data, mockWidth)).toEqual(getBannerHeight(mockData, mockWidth));
    });

    it('should return width of image when width is exist', () => {
        expect(data.width).toEqual(w);
    });

    it('should return 560 as image width when the width does not exist', () => {
        data = {
            height: h,
        };
        const mockData = {
            height: h,
            width: 560,
        };
        expect(getBannerHeight(data, mockWidth)).toEqual(getBannerHeight(mockData, mockWidth));
    });

    it('should check argument width is a number', () => {
        expect(typeof mockWidth === 'number').toEqual(true);
    });
});
