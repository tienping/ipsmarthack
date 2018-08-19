/**
 *
 * SosScreen
 *
 */

import React from 'react';
import { Container, Text, Thumbnail, View } from 'native-base';
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
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error:null,
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
        );
    }
    callOneSignalAPI = () => {
        this.props.dispatch(pushOneSignal(this.state.latitude, this.state.longitude));
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#49525d' }}>
                <SlideButton
                    onSlideSuccess={() => {
                        this.callOneSignalAPI();
                    }}
                >
                    <View
                        style={{
                            margin: getXdp(5),
                            borderRadius: 10,
                            marginTop: getYdp(40),
                            height: 70,
                            width: getXdp(90),
                            padding: getXdp(5),
                            backgroundColor: 'red',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlignVertical: 'center', color: 'white', fontSize: 24, fontWeight: '700', textAlign: 'center' }}>Swipe to SOS</Text>
                        <Thumbnail style={{ marginLeft: 13, alignSelf: 'center', height: 30, width: 30 }} source={{ url: 'https://png.icons8.com/ios/64/ffffff/double-right-filled.png' }}></Thumbnail>
                        <Thumbnail style={{ marginLeft: -13, alignSelf: 'center', height: 30, width: 30 }} source={{ url: 'https://png.icons8.com/ios/64/ffffff/double-right-filled.png' }}></Thumbnail>
                    </View>
                </SlideButton>
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
