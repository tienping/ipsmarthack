import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoadingScreen from '../index';

configure({ adapter: new Adapter() });
describe('<LoadingScreen />', () => {
    let visible;
    let loadingScreen;
    beforeEach(() => {
        visible = true;
    });

    it('should render LoadingScreen when it is being call', () => {
        loadingScreen = shallow(<LoadingScreen visible={visible} />);
        expect(loadingScreen.find('Styled(Container)').length).toBeGreaterThan(0);
    });

    it('should display the spinner when visible is true', () => {
        loadingScreen = shallow(<LoadingScreen visible={visible} />);
        expect(loadingScreen.find('Styled(Spinner)').length).toBeGreaterThan(0);
    });

    it('should hide the spinner when visible is false', () => {
        loadingScreen = shallow(<LoadingScreen visible={false} />);
        expect(loadingScreen.find('Styled(Container)').length).toBeGreaterThan(0);
    });
});
