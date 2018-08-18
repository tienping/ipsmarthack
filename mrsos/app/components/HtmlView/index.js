/**
 *
 * HtmlView
 *
 */

import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native';
import { transfromViewWidthToPercentage, getFullScreenWidth } from 'utils/hermoUtils';
import colorPalette from 'style/colorPalette';


class HtmlView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { URL, Html, styles } = this.props;

        if (Html) {
            const newHtml = Html.replace(/font-family:arial,helvetica,sans-serif/g, '');
            return (
                <ScrollView style={{ backgroundColor: colorPalette.White }}>
                    <HTML
                        html={newHtml}
                        style={{ width: getFullScreenWidth() }}
                        imagesMaxWidth={transfromViewWidthToPercentage(0.9)}
                        imagesInitialDimensions={transfromViewWidthToPercentage(0.9)}
                        staticContentMaxWidth={transfromViewWidthToPercentage(0.9)}
                    />
                </ScrollView>
            );
        } else if (URL) {
            return (
                <WebView
                    source={{ uri: URL }}
                    style={{ marginTop: 20 }}
                />
            );
        }


        return null;
    }
}

HtmlView.propTypes = {
    Html: PropTypes.string,
    URL: PropTypes.string,
};

export default HtmlView;
