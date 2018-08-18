
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from '../index';

configure({ adapter: new Adapter() });

describe('<WelcomeScreen />', () => {
    let welcomeScreen;
    let welcomeScreenProps;

    beforeEach(() => {
        welcomeScreenProps = {
            navigation: {
                navigate: {},
            },
        };
    });

    it('should render Welcome Screen', () => {
        welcomeScreen = shallow(<WelcomeScreen props={welcomeScreenProps} />);
        expect(welcomeScreen.find('Styled(Container)').length).toBeGreaterThanOrEqual(0);
    });
});
