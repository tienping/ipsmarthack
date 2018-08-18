/**
*
* Divider
*
*/

import React from 'react';
import { View } from 'react-native';
import { getXdp } from 'utils/hermoUtils';
import colorPalette from 'style/colorPalette';

class Divider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <View style={{ height: getXdp(1), backgroundColor: colorPalette.WhiteSmoke }} />
        );
    }
}

Divider.propTypes = {

};

export default Divider;
