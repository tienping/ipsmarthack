/**
*
* HermoText
*
*/

import React from 'react';
import { Text } from 'react-native';
import characterStyle from 'style/characterStyle';
import colorPalette from 'style/colorPalette';
import PropTypes from 'prop-types';
/* Example : <HermoText fontType="Body" style={{ padding: 10, color: colorPalette.Black }}></HermoText> */
export class HermoText extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { fontType, style, color, children, lineNumber } = this.props;
        let addOnTextType = characterStyle.Body;
        let addOnTextColor = { color: colorPalette.Black };
        switch (color && color.toUpperCase()) {
            case 'WHITE': addOnTextColor = { color: colorPalette.White };
                break;
            case 'BLACK': addOnTextColor = { color: colorPalette.Black };
                break;
            case 'GREY': addOnTextColor = { color: colorPalette.Grey };
                break;
            case 'SLIVER': addOnTextColor = { color: colorPalette.Sliver };
                break;
            case 'WHITESMOKE': addOnTextColor = { color: colorPalette.WhiteSmoke };
                break;
            case 'TYRIANPURPLE': addOnTextColor = { color: colorPalette.TyrianPurple };
                break;
            case 'LIGHTNINGYELLOW': addOnTextColor = { color: colorPalette.LightningYellow };
                break;
            case 'RED': addOnTextColor = { color: colorPalette.Red };
                break;
            case 'RAZZMATAZZ': addOnTextColor = { color: colorPalette.Razzmatazz };
                break;
            case 'EMERALD': addOnTextColor = { color: colorPalette.Emerald };
                break;
            default: addOnTextColor = { color: colorPalette.Black };
                break;
        }
        switch (fontType && fontType.toUpperCase()) {
            case 'BODYTITLE': addOnTextType = characterStyle.BodyTitle;
                break;
            case 'BODY': addOnTextType = characterStyle.Body;
                break;
            case 'LABELTITLE': addOnTextType = characterStyle.LabelTitle;
                break;
            case 'LABEL': addOnTextType = characterStyle.Label;
                break;
            case 'BUTTON': addOnTextType = characterStyle.Button;
                break;
            case 'TITLE': addOnTextType = characterStyle.Title;
                break;
            case 'SUBTITLE': addOnTextType = characterStyle.Subtitle;
                break;
            default: addOnTextType = characterStyle.Body;
                break;
        }

        const addOn = { ...addOnTextColor, ...addOnTextType };

        return (
            <Text style={{ ...addOn, ...style }} numberOfLines={lineNumber} adjustsFontSizeToFit={true}>{children}</Text>
        );
    }
}
HermoText.propTypes = {
    fontType: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string,
    // children: PropTypes.string,
    lineNumber: PropTypes.number,
};
