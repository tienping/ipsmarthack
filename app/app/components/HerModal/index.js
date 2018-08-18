/**
*
* HerModal
*
*/

import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import RNModal from 'react-native-modal';

// import messages from './messages';

class HerModal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    toggleModal = () => {
        this.props.isHerModalVisible = !this.props.isHerModalVisible;
    }

    render() {
        return (
            <RNModal isVisible={this.props.isHerModalVisible}>
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: 10,
                        ...this.props.styles,
                    }}
                >
                    {
                        this.props.onCloseModal ?
                            <Button onPress={() => this.props.onCloseModal()} title="Close" color="#841584" />
                            : null
                    }
                    {this.props.content}
                </View>
            </RNModal>
        );
    }
}

HerModal.propTypes = {
    content: PropTypes.object,
    isHerModalVisible: PropTypes.bool,
    onCloseModal: PropTypes.func,
    styles: PropTypes.object,
};

export default HerModal;
