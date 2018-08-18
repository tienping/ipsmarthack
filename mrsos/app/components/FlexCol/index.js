/**
*
* FlexCol
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text } from 'native-base';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const deviceWidth = Dimensions.get('window').width;

class FlexCol extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    getSize = (x, y) => (
        (deviceWidth * y) / x
    );

    render() {
        return (
            <View
                style={{
                    position: 'relative',
                    minHeight: 1,
                    flexBasis: this.getSize(this.props.sizeOfCol, this.props.widthPercent),
                    flexGrow: 0,
                    flexShrink: 0,
                    maxWidth: this.getSize(this.props.sizeOfCol, this.props.widthPercent),
                }}
            >
                {this.props.renderItem()}
            </View>
        );
    }
}

FlexCol.propTypes = {
    sizeOfCol: PropTypes.number,
    renderItem: PropTypes.func,
    widthPercent: PropTypes.number,
};

export default FlexCol;
