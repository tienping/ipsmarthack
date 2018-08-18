/**
 *
 * ButtonLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { dataChecking, getFullScreenWidth } from 'utils/hermoUtils';
import { ImageHolder } from 'components/ImageLink/index';
import { HermoText } from 'style/HerComponent/index';
import colorPalette from 'style/colorPalette';

function ButtonLink(props) {
    const { buttons, itemSelected } = props;
    const buttonLinks = buttons.map((button) => {
        if (button.title && dataChecking(button, 'image', 'app')) {
            const dimension = (getFullScreenWidth() / 4) - 20;
            return (
                <View style={[{ width: dimension }]} key={button.id} >
                    <TouchableOpacity onPress={() => itemSelected(button)} >
                        <ImageHolder imageStyle={{ alignSelf: 'center', height: 56, width: 56 }} imageSource={button.image.app} />
                        <HermoText
                            style={{
                                textAlign: 'center',
                                width: dimension,
                                marginTop: 3,
                            }}
                            fontType="Label"
                            color="black"
                            lineNumber={2}
                        >
                            {button.title.toUpperCase()}
                        </HermoText>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    });


    return (
        <View style={styles.container}>
            { buttonLinks }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: getFullScreenWidth(),
        backgroundColor: colorPalette.White,
        justifyContent: 'space-between',
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 12,
    },
});

ButtonLink.propTypes = {
    buttons: PropTypes.array.isRequired,
    itemSelected: PropTypes.func.isRequired,
};

export default ButtonLink;
