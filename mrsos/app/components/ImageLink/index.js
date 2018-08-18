/**
 *
 * ImageLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
// import styled from 'styled-components';
import {
    transfromViewWidthToPercentage,
    getBannerHeight,
    dataChecking,
} from 'utils/hermoUtils';
import { handleAppLink } from 'utils/appLinkHandler';

export function ImageHolder(props) {
    const { imageStyle, imageSource, imageResizeMode } = props;
    return (
        <Image
            style={imageStyle}
            source={{ uri: imageSource || 'https://www.hermo.sg/images/fb/hermo-logo.png' }}
            resizeMode={imageResizeMode || 'contain'}
        />
    );
}

function ImageLink(props) {
    // const imageStyle = { height: getBannerHeight(props.data.banner.items[0].property.image.app, transfromViewWidthToPercentage(1.0)) };
    // const imageSource = props.data.banner.items[0].image.app;

    const imageStyle = { height: getBannerHeight(props.data.property.image.app, transfromViewWidthToPercentage(1.0)) };
    const imageSource = props.data.image.app;
    return (
        <TouchableOpacity
            activeOpacity={props.activeOpacity || 0.2}
            onPress={() => {
                if (dataChecking(props.data, '_applink')) {
                    handleAppLink(props.data._applink, props.navigator);
                }
            }}
        >
            <ImageHolder
                key={props.data.id}
                imageStyle={imageStyle}
                imageSource={imageSource}
            />
        </TouchableOpacity>
    );
}

ImageHolder.propTypes = {
    imageStyle: PropTypes.object.isRequired,
    imageSource: PropTypes.string.isRequired,
    imageResizeMode: PropTypes.string,
};

ImageLink.propTypes = {
    data: PropTypes.object,
};

export default ImageLink;
