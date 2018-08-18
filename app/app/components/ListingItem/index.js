/**
*
* ListingItem
*
*/

import React from 'react';
import { Container, Content, Text, Icon, Input, Item, List, ListItem, Separator, Right, Left } from 'native-base';
import { Dimensions, View, FlatList, TouchableWithoutFeedback, Alert } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

export const TitleHeader = styled(Text)`
    text-align: center;
    font-weight: 600;
`;

export const ListContainer = styled(View)`
    padding: 5px;
`;

function ListingItem(props) {
    return (
        <View>
            <TitleHeader>{props.data.title}</TitleHeader>
            <FlatList
                data={props.data.items}
                renderItem={
                    ({ item }) => (
                        <TouchableWithoutFeedback onPress={ () => Alert.alert(`You tapped ${item.text} !`)}>
                            <ListContainer>
                                <View>
                                    <Text>{item.text}</Text>
                                </View>
                                <View style={{ position: 'absolute', right: 10, top: 3 }}>
                                    <Icon name="ios-arrow-forward" />
                                </View>
                            </ListContainer>
                        </TouchableWithoutFeedback>
                    )
                }
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}

ListingItem.propTypes = {

};

export default ListingItem;
