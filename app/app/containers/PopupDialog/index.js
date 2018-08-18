/**
 *
 * popupDialog
 *
 */

import React from 'react';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getFullScreenHeight, getFullScreenWidth } from 'utils/hermoUtils';
import colorPalette from 'style/colorPalette';
import HtmlView from 'components/HtmlView/index';
import { HTML_API_DIALOG } from 'utils/appLinkHandler';
import LoadingScreen from 'components/LoadingScreen/index';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPopupDialog, {
    makeSelectPopupDialogData,
    makeSelectPopupDialogLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getApiData, getBundleData } from './actions';


export class PopupDialog extends React.PureComponent {
    componentDidMount() {
        this.loadContent();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.getContent();
        }
    }

    getContent = () => {
        const { fireAPI, item, isImage, isHtml, isUrl, data, loading } = this.props;
        if (loading) {
            return <LoadingScreen visible={true} />;
        }

        if (isImage) {
            return <Image source={{ uri: item }} style={styles.content} resizeMode="contain" />;
        } else if (isHtml) {
            if (fireAPI === true) {
                return <HtmlView Html={data} style={styles.content} />;
            }

            return <HtmlView Html={item} />;
        } else if (isUrl) {
            return <HtmlView URL={item} />;
        }
        return null;
    }

    loadContent = () => {
        const { fireAPI, item, bundleId, type } = this.props;
        if (fireAPI === true) {
            switch (type) {
                case HTML_API_DIALOG:
                    this.props.dispatch(getApiData(item));
                    break;
                case 'BUNDLEDETAIL':
                    this.props.dispatch(getBundleData(item, bundleId));
                    break;
                default:
                    break;
            }
        }
    }

    closeLightBox = () => {
        this.props.navigator.dismissLightBox();
    }

    render() {
        return (
            <View>

                <View style={styles.container}>
                    <View style={styles.innerContainer}>

                        <View style={styles.topContainer} >
                            <TouchableOpacity style={styles.closeContainer} onPress={() => this.closeLightBox()}>
                                <Icon name="ios-close-outline" size={30} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                        {this.getContent()}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: getFullScreenWidth(),
        height: getFullScreenHeight(),
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    innerContainer: {
        width: getFullScreenWidth() * 0.9,
        height: getFullScreenHeight() * 0.88,
    },
    topContainer: {
        width: getFullScreenWidth() * 0.9,
        alignItems: 'flex-end',
    },
    closeContainer: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPalette.White,
    },
    closeIcon: {
        color: colorPalette.Black,
    },
    content: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: getFullScreenWidth() * 0.9,
        height: getFullScreenHeight() * 0.7,
    },
};

PopupDialog.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    data: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
    popupdialog: makeSelectPopupDialog(),
    loading: makeSelectPopupDialogLoading(),
    data: makeSelectPopupDialogData(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'PopupDialog', reducer });
const withSaga = injectSaga({ key: 'PopupDialog', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(PopupDialog);
