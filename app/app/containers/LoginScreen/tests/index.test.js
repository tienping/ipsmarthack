import React from 'react';
import { shallow , configure } from 'enzyme';
import { LoginScreen, mapDispatchToProps } from '../index';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe('<LoginScreen />', () => {
    it('Expect to have unit tests specified', () => {
        const tree = shallow(<LoginScreen dispatch={jest.fn()} />);
        expect(tree).toMatchSnapshot();
    });
});

describe('mapDispatchToProps', () => {
    it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result).toBeDefined();
    });
});
