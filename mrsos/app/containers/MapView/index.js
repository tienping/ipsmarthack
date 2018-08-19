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
            }
          };

        ImagePicker.launchCamera(options, (response)  => {
            // Same code as in above section!
        });
    }

    render() {
        // const { latitude, longitude } = this.props.data;
        return (
            <Container>
                <View style={{ height: getYdp(70) }}>
                    <WebView
                        source={{ uri: 'https://www.google.com/maps/?q=1.427524,103.633493' }}
                        // source={{ uri: `https://www.google.com/maps/?q=${latitude},${longitude}` }}
                    />
                </View>
                <TouchableOpacity onPress={() => this.openCamera()}>
                    <Thumbnail
                        style={{ padding: 50, width: 50, height: 50, alignSelf: 'center' }}
                        square={true}
                        source={{ uri: 'https://cdn2.iconfinder.com/data/icons/transparent-round-icons/512/camera.png' }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </Container>
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
