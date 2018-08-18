/**
 *
 * Carousel
 *
 */

import React from 'react';
import {
    Dimensions,
    TouchableOpacity,
    View,
} from 'react-native';
import { Container } from 'native-base';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import ImageLink from 'components/ImageLink/index';

import { dataChecking, getBannerHeight } from 'utils/hermoUtils';
import { handleAppLink } from 'utils/appLinkHandler';

function Carousel(props) {
    const banner = dataChecking(props.banners[0], 'property', 'image', 'app');
    const height = (banner && banner.height) ? getBannerHeight(banner, Dimensions.get('window').width) + 20 : Dimensions.get('window').width + 20;

    const applinkHandler = (item, navigator) => {
        if (dataChecking(item, '_applink')) {
            handleAppLink(item._applink, navigator);
        }
    };

    return (
        <View style={{ backgroundColor: 'white' }}>
            <Swiper
                dot={<View
                    style={{
                        backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,
                    }}
                />}
                activeDot={<View
                    style={{
                        backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,
                    }}
                />}
                height={height}
                autoplay={props.autoPlay}
                autoplayTimeout={4}
                paginationStyle={{ justifyContent: 'center', bottom: 0, padding: 5 }}
            >
                {
                    props.banners.map((item) => {
                        if (dataChecking(item, '_applink')) {
                            return (
                                <TouchableOpacity
                                    key={`banner.${item.id}`}
                                    activeOpacity={1}
                                    onPress={() => applinkHandler(item, props.navigator)}
                                >
                                    <ImageLink data={item} navigator={props.navigator} activeOpacity={1} />
                                </TouchableOpacity>
                            );
                        }
                        return (
                            <Container key={`banner.${item.id}`} >
                                <ImageLink data={item} navigator={props.navigator} />
                            </Container>
                        );
                    })
                }
            </Swiper>
        </View>
    );
}


Carousel.propTypes = {
    banners: PropTypes.array.isRequired,
    autoPlay: PropTypes.bool.isRequired,
};

export default Carousel;
