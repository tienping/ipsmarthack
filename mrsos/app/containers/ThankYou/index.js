/**
 *
 * ThankYou
 *
 */

import React from 'react';
import { Container, Content, Text, Thumbnail } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';


export class ThankYou extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <Container>
                <Content>
                    <Thumbnail
                        style={{ padding: 50, width: 200, height: 400, alignSelf: 'center' }}
                        square={true}
                        source={require('hermo/Resources/super.gif')}
                        resizeMode="contain"
                    />
                    <Text style={{ fontSize: 30, fontWeight: '600', justifyContent: 'center', textAlign: 'center' }}>Thank You!</Text>
                    <Text style={{ fontSize: 30, fontWeight: '600', justifyContent: 'center', textAlign: 'center' }}>You saved the day!</Text>
                </Content>
            </Container>
        );
    }
}

ThankYou.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
    withConnect,
)(ThankYou);
