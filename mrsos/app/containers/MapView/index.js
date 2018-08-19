/**
 *
 * MapView
 *
 */

import React from 'react';
import { Container, Content, Text, Thumbnail } from 'native-base';
import { View, WebView, TouchableOpacity } from 'react-native';
import { getYdp } from 'utils/hermoUtils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ImagePicker from 'react-native-image-picker';

export class MapView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    openCamera = () => {
        const options = {
            title: 'Shooting Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.launchCamera(options, () => {
            // Same code as in above section!
            this.props.navigator.push({
                screen: 'hermorn.screen.ThankYou',
                backButtonTitle: '',
                animated: true,
                title: 'Thank You',
            });
        });
    }

    render() {
        // const { latitude, longitude } = this.props.data;
        return (
            <View style={{ height: getYdp(90) }}>
                <View style={{ height: getYdp(110) }}>
                    <WebView
                        source={{ uri: 'https://www.google.com/maps/?q=1.427524,103.633493' }}
                        // source={{ uri: `https://www.google.com/maps/?q=${latitude},${longitude}` }}
                    />
                </View>
                <TouchableOpacity onPress={() => this.openCamera()}>
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', alignSelf: 'center', borderRadius: 50, position: 'absolute', bottom: 0, marginBottom: getYdp(30), padding: 20 }} >
                        <Thumbnail
                            style={{ width: 46, height: 46 }}
                            square={true}
                            source={{ uri: 'https://png.icons8.com/metro/52/ffffff/screenshot.png' }}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

MapView.propTypes = {
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
)(MapView);
