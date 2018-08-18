import React from 'react';
import { configure, shallow } from 'enzyme';
import { Dimensions } from 'react-native';
import Adapter from 'enzyme-adapter-react-16';
import { getBannerHeight } from 'utils/hermoUtils';
import Carousel from '../index';

configure({ adapter: new Adapter() });
describe('<Carousel />', () => {
    const window = Dimensions.get('window');
    let banner;
    let isSelectable;
    let autoPlay;
    let width;
    let carousel;
    beforeEach(() => {
        banner = [
            {
                property: {
                    image: {
                        app: {
                            height: 100,
                        },
                    },
                },
                image: {
                    app: 'url string',
                },
            },
        ];
        width = 200;
        isSelectable = true;
        autoPlay = true;
    });

    it('should return width of the window as height when height is not valid', () => {
        banner[0].property.image.app.height = undefined;
        carousel = shallow(<Carousel banners={banner} isSelectable={isSelectable} autoPlay={autoPlay} width={width} />);
        const h = window.width;
        const mockData = {
            height: h,
        };
        expect(carousel.props().height).toEqual(mockData.height);
    });

    it('should return height when height is valid', () => {
        carousel = shallow(<Carousel banners={banner} isSelectable={isSelectable} autoPlay={autoPlay} width={width} />);
        expect(carousel.props().height).toEqual(getBannerHeight(banner[0].property.image.app, window.width));
    });

    it('should return <TouchableOpacity> when isSelectable is true', () => {
        const wrapper = shallow(<Carousel banners={banner} isSelectable={isSelectable} autoPlay={autoPlay} width={width} />);
        expect(wrapper.find('TouchableOpacity').length).toBeGreaterThan(0);
    });

    it('should return <Container> when isSelectable is false', () => {
        carousel = shallow(<Carousel banners={banner} isSelectable={false} autoPlay={autoPlay} width={width} />);
        expect(carousel.find('Styled(Container)').length).toBeGreaterThan(0);
    });

    it('should return width of the window when props.width is not exist', () => {
        carousel = shallow(<Carousel banners={banner} isSelectable={false} autoPlay={autoPlay} />);
        expect(carousel.find('Image').props().style.height).toEqual(window.width);
    });

    it('should return width of the window when props.width is not exist', () => {
        carousel = shallow(<Carousel banners={banner} isSelectable={false} autoPlay={autoPlay} width={width} />);
        expect(carousel.find('Image').props().style.height).toEqual(width);
    });
});

