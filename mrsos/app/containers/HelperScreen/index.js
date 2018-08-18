/**
 *
 * HelperScreen
 *
 */

import React from 'react';
import { View, Switch } from 'react-native';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import colorPalette from 'style/colorPalette';
import { getXdp } from 'utils/hermoUtils';
import { readSchema, writeSchema, deleteSchema } from 'utils/realmStorage';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { globalScope } from 'hermo/globalScope';
import makeSelectHelperScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class HelperScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        initialized: false,
        beHero: false,
    };

    componentDidMount() {
        if (!this.state.initialized) {
            readSchema('hero').then((result) => {
                if (result && result[0]) {
                    globalScope.beHero = result[0].beHero;
                    this.setState({ beHero: result[0].beHero });
                }
            });
            this.state.initialized = true;
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ paddingTop: 30 }}>
                        <Text style={{ color: colorPalette.theme, fontSize: 36, textAlign: 'center' }}>Do you want to be</Text>
                        <Text style={{ color: colorPalette.theme, fontSize: 36, textAlign: 'center' }}>Mr.SOS ?</Text>
                    </View>
                    <View style={{ paddingTop: 100, paddingBottom: 10, height: 150, justifyContent: 'center' }}>
                        <Switch
                            style={{ alignSelf: 'center', alignItems: 'center', transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }] }}
                            value={this.state.beHero}
                            onTintColor={colorPalette.theme}
                            onValueChange={(newValue) => {
                                this.setState({ beHero: newValue });
                                deleteSchema('hero');
                                writeSchema('hero', { beHero: newValue });
                            }}
                        />
                    </View>
                    <View>
                        <Text style={{ color: colorPalette.theme, textAlign: 'center', fontSize: 18, padding: getXdp(10) }}>
                            you will receive emergency help request in your area.
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

HelperScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    helperscreen: makeSelectHelperScreen(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'helperScreen', reducer });
const withSaga = injectSaga({ key: 'helperScreen', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HelperScreen);
