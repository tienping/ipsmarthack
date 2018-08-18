import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HomeScreen, mapDispatchToProps } from '../index';

configure({ adapter: new Adapter() });

describe('<HomeScreen />', () => {
    let home;
    let homeScreenProps ;
    beforeEach(() => {
        homeScreenProps = {
            store: {
                banner: {
                    items: [{}],
                },
                button_link: {
                    items: [
                        {
                            image: '',
                        },
                        {
                            image: '',
                        },
                        {
                            image: '',
                        },
                        {
                            image: '',
                        },
                    ],
                },
            },
            twoh: {
                result: [{}],
                title: '',

            },
            _meta: {},
            _links: {},
            loading: false,
            error: false,
            dispatch: jest.fn(),
        };
    });

    it('should render loadingScreen when loading is true and store size is less than 0', () => {
        homeScreenProps = {
            store: {},
            _meta: {},
            _links: {},
            loading: true,
            error: false,
            dispatch: jest.fn(),
        };
        home = shallow(<HomeScreen {...homeScreenProps} />);
        expect(home.find('LoadingScreen').length).toBeGreaterThan(0);
    });

    it('should render <Carousel> when banner is exist', () => {
        home = shallow(<HomeScreen {...homeScreenProps} />);
        expect(home.find('Carousel').length).toBeGreaterThan(0);
    });

    it('should render <Carousel> when length of banner is more than 0', () => {
        home = shallow(<HomeScreen {...homeScreenProps} />);
        expect(home.find('Carousel').length).toBeGreaterThan(0);
    });

    it('should render null when banner is not exist', () => {
        homeScreenProps = {
            store: {
                banner: {},
            },
            _meta: {},
            _links: {},
            loading: false,
            error: false,
            dispatch: jest.fn(),
        };
        home = shallow(<HomeScreen {...homeScreenProps} />);
        expect(home.find('Carousel').length).toBeLessThanOrEqual(0);
    });


    it('should render button link when the length is equal 4', () => {
        home = shallow(<HomeScreen {...homeScreenProps} />);
        expect(home.find('ButtonLink').length).toBeGreaterThan(0);
    });

    it('should render null when button link is not equal 4', () => {
        homeScreenProps = {
            store: {
                button_link: {
                    items: [
                        {
                            image: '',
                        },
                        {
                            image: '',
                        },
                        {
                            image: '',
                        },
                    ],
                },
            },
            _meta: {},
            _links: {},
            loading: false,
            error: false,
            dispatch: jest.fn(),
        };
        home = shallow(<HomeScreen {...homeScreenProps} />);
        expect(home.find('ButtonLink').length).toBeLessThanOrEqual(0);
    });

    it('should render twoh when props is more than 1', () => {
        homeScreenProps = {
            store: {
                button_link: {
                    items: [
                        {
                            image: '',
                        },
                        {
                            image: '',
                        },
                        {
                            image: '',
                        },
                    ],
                },
            },
            twoh: {
                result: [
                    {
                        primary: {},
                        secondary: {},
                    },
                ],
                title: '',

            },
            _meta: {},
            _links: {},
            loading: false,
            error: false,
            dispatch: jest.fn(),
        };
        home = shallow(<HomeScreen {...homeScreenProps} />);
        expect(home.find('Twoh').length).toBeGreaterThanOrEqual(0);
    });

    it('should render null when twoh props is less than 1', () => {
        homeScreenProps = {
            store: {
                button_link: {
                    items: [
                        {
                            image: '',
                        },
                        {
                            image: '',
                        },
                        {
                            image: '',
                        },
                    ],
                },
            },
            twoh: {
                title: '',

            },
            _meta: {},
            _links: {},
            loading: false,
            error: false,
            dispatch: jest.fn(),
        };
        home = shallow(<HomeScreen {...homeScreenProps} />);

        expect(home.find('LoadingScreen').length).toBeGreaterThan(0);
    });

});

describe('mapDispatchToProps', () => {
    it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result).toBeDefined();
    });
});
