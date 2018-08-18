import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ButtonLink from '../index';
configure({ adapter: new Adapter() });


describe('<ButtonLink />', () => {
    let buttonLink;
    let buttonLinkProps;
    beforeEach(() => {
        buttonLinkProps = {
            buttons: [
                {
                    image: {
                        app: 'g',
                    },
                    title: 'g',
                },
                {
                    image: {
                        app: 'g',
                    },
                    title: 'g',
                },
                {
                    image: {
                        app: 'g',
                    },
                    title: 'g',
                },
                {
                    image: {
                        app: 'g',
                    },
                    title: 'g',
                },
            ],
        };
    });
    it('should render button when buttons title and image exist', () => {
        buttonLink = shallow(<ButtonLink {...buttonLinkProps} />);
        expect(buttonLink.find('Styled(Thumbnail)').length).toEqual(4);
    });

    it('should return null when buttons title and image not exist', () => {
        buttonLinkProps = {
            buttons: [
                {
                    image: {
                        app: 'd',
                    },
                    title: 'd',
                },
                {
                    image: {
                        app: '',
                    },
                    title: '',
                },
                {
                    image: {
                        app: '',
                    },
                    title: '',
                },
                {
                    image: {
                        app: '',
                    },
                    title: '',
                },
            ],
        };
        buttonLink = shallow(<ButtonLink {...buttonLinkProps} />);
        expect(buttonLink.find('Styled(Thumbnail)').length).toBeLessThan(4);
    });
});
