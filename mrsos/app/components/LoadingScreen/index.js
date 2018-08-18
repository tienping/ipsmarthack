/**
 *
 * LoadingScreen
 *
 */

import React from 'react';
import { Spinner } from 'native-base';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
// import styled from 'styled-components/native';

function LoadingScreen(props) {
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                height: Dimensions.get('window').height,
            }}
        >
            {
                props.visible ?
                    <View>
                        <Spinner color="#9a9a9a" />
                    </View>
                    : null
            }
        </View>
    );
}

LoadingScreen.propTypes = {
    visible: PropTypes.bool.isRequired,
};

export default LoadingScreen;
