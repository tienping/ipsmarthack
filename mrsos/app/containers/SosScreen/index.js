/**
 *
 * SosScreen
 *
 */

import React from 'react';
import { Container, Content, Text, Button, View } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { getXdp, getYdp } from 'utils/hermoUtils';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { SlideButton } from '../../asset/SlideButton.js';
import { pushOneSignal } from './actions';
import makeSelectSosScreen from './selectors';
import reducer from './reducer';
import saga from './saga';

export class SosScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    callOneSignalAPI = () => {
        this.props.dispatch(pushOneSignal());
    }
    render() {
        return (
            <Container>
                <View style={{height: 50, width: 500}}>
                    <SlideButton
                        onSlideSuccess={() => {
                            this.callOneSignalAPI();
                        }}
                    >
                        <View style={{ margin: getXdp(5), borderRadius: 10, marginTop: getYdp(35), height: 70, width: getXdp(90), padding: getXdp(5), backgroundColor: 'red' }}>
                            <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>Swipe to SOS</Text>
                        </View>
                    </SlideButton>
                </View>
            </Container>
        );
    }
}

SosScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    sosscreen: makeSelectSosScreen(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sosScreen', reducer });
const withSaga = injectSaga({ key: 'sosScreen', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(SosScreen);
