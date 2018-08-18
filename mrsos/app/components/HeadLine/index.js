/**
*
* HeadLine
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native';
import { dataChecking } from 'utils/hermoUtils';
import { handleAppLink } from 'utils/appLinkHandler';
import colorPalette from 'style/colorPalette';

class HeadLine extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { data } = this.props;
        const textStyle = data.action ? null : { textAlign: data.title.alignment };
        const textFontStyle = {
            style: {
                fontSize: 14,
                fontWeight: 'bold',
            },
        };
        return (
            <View style={{ padding: 10, paddingTop: 15, backgroundColor: colorPalette.White }}>
                <View>
                    <Text style={textStyle} {...textFontStyle}>
                        {dataChecking(data, 'title', 'text') ? data.title.text.toUpperCase() : '' }
                    </Text>
                </View>
                {
                    dataChecking(data, 'action') ?
                        <View style={{ position: 'absolute', right: 10, padding: 10, paddingTop: 15 }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    if (dataChecking(data, 'action', '_applink')) {
                                        handleAppLink(data.action._applink, this.props.navigator);
                                    }
                                }}
                            >
                                <Text style={{ fontSize: 14 }}>{data.action.text}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        :
                        null
                }
            </View>
        );
    }
}

HeadLine.propTypes = {
    data: PropTypes.object.isRequired,
};

export default HeadLine;
