/**
 *
 * ThankYou
 *
 */

import React from 'react';
import { Container, Content, Text, Thumbnail, Button } from 'native-base';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';


export class ThankYou extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    render() {
        return (
            <Container>
                <Content>
                    <Thumbnail
                        style={{ padding: 50, width: 200, height: 200, alignSelf: 'center' }}
                        square={true}
                        source={require('hermo/Resources/super.gif')}
                        resizeMode="contain"
                    />
                    <Text style={{ fontSize: 30, justifyContent: 'center', textAlign: 'center' }}>Thank You!</Text>
                    <Text style={{ fontSize: 30, justifyContent: 'center', textAlign: 'center' }}>You saved the day!</Text>


                    <View style={{ paddingTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: '600', justifyContent: 'center', textAlign: 'center' }}>Write down your feeling.</Text>
                        <TextInput
                            style={{ marginTop: 10, marginLeft: 30, marginRight: 30, height: 100, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                            placeholder="write something here."
                        />
                        <Button
                            style={{ marginTop: 10, padding: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
                            onPress={() => {
                                alert('Submmited!');
                            }}
                        >
                            <Text>Submit</Text>
                        </Button>
                    </View>


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
