/**
 *
 * SosScreen
 *
 */

import React from 'react';
import { Container, Content, Text, Button } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
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
                <Content>
                    <Button block={true} onPress={() => this.callOneSignalAPI()}>
                        <Text>SOS</Text>
                    </Button>
                </Content>
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
