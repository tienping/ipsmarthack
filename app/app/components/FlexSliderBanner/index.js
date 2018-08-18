/**
*
* FlexSliderBanner
*
*/

import React from 'react';
import { View, FlatList } from 'react-native';
import { ImageHolder } from 'components/ImageLink/index';
import PropTypes from 'prop-types';
import { transfromViewWidthToPercentage, transfromViewHeightBasedOnPercentage } from 'utils/hermoUtils';
// import styled from 'styled-components';

function FlexSliderBanner(props) {
    return (
        <View>
            {
                props.items.length ?
                    <View>
                        <FlatList
                            horizontal={true}
                            data={props.items}
                            renderItem={({ item }) => (
                                <ImageHolder imageSource={item.image.app} imageStyle={{ width: transfromViewWidthToPercentage(props.imageWidth), height: transfromViewHeightBasedOnPercentage(item.property.image.app.height, item.property.image.app.width, props.imageWidth) }} resizeMode="contain" />
                            )}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    : null
            }
        </View>
    );
}

FlexSliderBanner.propTypes = {
    items: PropTypes.array,
    imageWidth: PropTypes.number.isRequired,
};

export default FlexSliderBanner;
