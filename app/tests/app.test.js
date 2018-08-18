import React from 'react';
import { Root } from 'native-base';
import App from '../App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe('App', () => {
    it('should render correctly', () => {
        const tree = shallow(<App />)
        expect(tree).toMatchSnapshot();
    });
});
