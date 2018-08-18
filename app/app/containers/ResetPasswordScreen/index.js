/**
 *
 * ResetPasswordScreen
 *
 */

import React from 'react';
import { Content, Body, Text, Button, Input, Item, Header, Title, Left, Right, Icon, Spinner } from 'native-base';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { dataChecking } from 'utils/hermoUtils';
import colorPalette from '../../style/colorPalette';
import HermoText from 'style/HerComponent';
import styled from 'styled-components/native';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { selectResetData, selectResetError, selectResetLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
    resetPasswordRequest,
} from './actions';

const ResetHeader = styled(Header)`
    background-color: white;
`;

const ResetHeaderTitle = styled(Title)`
    color: gray;
    justifyContent: center;
`;

const style = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },
    logo: {
        height: 180,
        width: 180,
    },
});
export class ResetPasswordScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static navigatorStyle = {
        tabBarHidden: true,
    }

    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../../Resources/ic-back.png'),
                id: 'back',
            },
        ],
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }


    state = {
        currentPassword: '',
        newPassword: '',
        newConfirmPassword: '',
        newPswErr: false,
        newPswErrText: '',
        newConPswErr: false,
        newConPswErrText: '',
        currentPswErr: false,
        currentPswErrText: '',
        errInfo: [],
        successInfo: [],
        passwordHide: true,
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.resetError !== this.props.resetError) {
            if (dataChecking(nextProps, 'resetError') && !nextProps.resetLoading && nextProps.resetError !== null) {
                this.setState({ errInfo: dataChecking(nextProps, 'resetError', 'response', 'messages') });
            }
        }
        if (nextProps.resetData !== this.props.resetData) {
            if (dataChecking(nextProps, 'resetData') && !nextProps.resetLoading && nextProps.resetData !== null) {
                this.setState({ successInfo: dataChecking(nextProps, 'resetData', 'response', 'messages') });
            }
        }
    }

    onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress' && event.id === 'back') {
            this.props.navigator.pop({
                animated: true,
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
            });
        }
    }

    onResetPasswordHandler = () => {
        this.initValue();
        const { currentPassword, newPassword, newConfirmPassword } = this.state;
        if (currentPassword === '' || newPassword === '' || newConfirmPassword === '') {
            if (currentPassword === '') {
                this.setState({ currentPswErr: true, currentPswErrText: 'Please enter current password.' });
            } else {
                this.setState({ currentPswErr: false, currentPswErrText: '' });
            }
            if (newPassword === '') {
                this.setState({ newPswErr: true, newPswErrText: 'Please enter new password.' });
            } else {
                this.setState({ newPswErr: false, newPswErrText: '' });
            }
            if (newConfirmPassword === '') {
                this.setState({ newConPswErr: true, newConPswErrText: 'Please confirm your password.' });
            } else {
                this.setState({ newConPswErr: false, newConPswErrText: '' });
            }
        } else if (newConfirmPassword !== newPassword) {
            this.setState({ newConPswErr: true, newConPswErrText: 'Confirmation Password Not match.' });
        } else {
            this.props.dispatch(resetPasswordRequest(currentPassword, newPassword, newConfirmPassword));
        }
    };

    initValue = () => {
        this.setState({ currentPswErr: false, currentPswErrText: '' });
        this.setState({ newPswErr: false, newPswErrText: '' });
        this.setState({ newConPswErr: false, newConPswErrText: '' });
        this.setState({ errInfo: [] });
        this.setState({ successInfo: [] });
    }

    togglePasswordHideAndShow = () =>
    {
        this.setState({ passwordHide: !this.state.passwordHide });
    }

    inputCurrentPassword = (props) => (
        <Content style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', lineHeight: 16 }}>{props.inputTitle}</Text>
            <View style={{ borderColor: this.state.currentPswErr ? 'red' : null, borderWidth: this.state.currentPswErr ? 1 : 0 }}>
                <Item>
                    <Image style={{ marginLeft: 10, width: 18, height: 18 }} source={require('../../Resources/pass.png')} />
                    <Input
                        style={{ fontSize: 14, lineHeight: 16, marginLeft: 16 }}
                        placeholder={props.inputMsg}
                        secureTextEntry={this.state.passwordHide}
                        onChangeText={(password) => this.setState({ currentPassword: password, currentPswErr: false, currentPswErrText: '' })}
                    />
                    <Text style={{ marginRight: 10 }} onPress={() => this.togglePasswordHideAndShow()}>{this.state.passwordHide ? <Image style={{ width: 18, height: 18 }} source={require('../../Resources/seepass.png')} />
                        : <Image style={{ width: 18, height: 18 }} source={require('../../Resources/seepass.png')} />
                    }</Text>
                </Item>
            </View>
            {
                this.state.currentPswErr ?
                    <View style={{ backgroundColor: 'red', flexDirection: 'row', paddingLeft: 10 }}>
                        <Icon name="information-circle" style={{ color: 'white', fontSize: 16, alignSelf: 'center' }} />
                        <HermoText color="WhiteSmoke" style={{ textAlign: 'center', padding: 2 }}>{this.state.currentPswErrText}</HermoText>
                    </View> : null
            }
        </Content>
    )

    inputNewPassword = (props) => (
        <Content style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ fontSize: 14, lineHeight: 16, fontWeight: 'bold' }}>{props.inputTitle}</Text>
            <View style={{ borderColor: this.state.newPswErr ? 'red' : null, borderWidth: this.state.newPswErr ? 1 : 0 }}>
                <Item>
                    <Image style={{ marginLeft: 10, width: 18, height: 18 }} source={require('../../Resources/pass.png')} />
                    <Input
                        style={{ fontSize: 14, lineHeight: 16, marginLeft: 16 }}
                        placeholder={props.inputMsg}
                        secureTextEntry={this.state.passwordHide}
                        onChangeText={(password) => this.setState({ newPassword: password, newPswErr: false, newPswErrText: '' })}
                    />
                    <Text style={{ marginRight: 10 }} onPress={() => this.togglePasswordHideAndShow()}>{this.state.passwordHide ? <Image style={{ width: 18, height: 18 }} source={require('../../Resources/seepass.png')} />
                        : <Image style={{ width: 18, height: 18 }} source={require('../../Resources/seepass.png')} />
                    }</Text>
                </Item>
            </View>
            {
                this.state.newPswErr ?
                    <View style={{ backgroundColor: 'red', flexDirection: 'row', paddingLeft: 10 }}>
                        <Icon name="information-circle" style={{ color: 'white', fontSize: 16, alignSelf: 'center' }} />
                        <HermoText color="WhiteSmoke" style={{ textAlign: 'center', padding: 2 }}>{this.state.newPswErrText}</HermoText>
                    </View> : null
            }
        </Content>
    )

    inputNewConfirmPassword = (props) => (
        <Content style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', lineHeight: 16 }}>{props.inputTitle}</Text>
            <View style={{ borderColor: this.state.newConPswErr ? 'red' : null, borderWidth: this.state.newConPswErr ? 1 : 0 }}>
                <Item>
                    <Image style={{ marginLeft: 10, width: 18, height: 18 }} source={require('../../Resources/confirmpass.png')} />
                    <Input
                        style={{ fontSize: 14, lineHeight: 16, marginLeft: 16 }}
                        placeholder={props.inputMsg}
                        secureTextEntry={this.state.passwordHide}
                        onChangeText={(password) => this.setState({ newConfirmPassword: password, newConPswErr: false, newConPswErrText: '' })}
                    />
                    <Text style={{ marginRight: 10 }} onPress={() => this.togglePasswordHideAndShow()}>{this.state.passwordHide ? <Image style={{ width: 18, height: 18 }} source={require('../../Resources/seepass.png')} />
                        : <Image style={{ width: 18, height: 18 }} source={require('../../Resources/seepass.png')} />
                    }</Text>
                </Item>
            </View>
            {
                this.state.newConPswErr ?
                    <View style={{ backgroundColor: 'red', flexDirection: 'row', paddingLeft: 10 }}>
                        <Icon name="information-circle" style={{ color: 'white', fontSize: 16, alignSelf: 'center' }} />
                        <HermoText color="WhiteSmoke" style={{ textAlign: 'center', padding: 2 }}>{this.state.newConPswErrText}</HermoText>
                    </View> : null
            }
        </Content>
    )

    renderHeader = () => (
        <ResetHeader>
            <Left />
            <Body>
                <ResetHeaderTitle>
                    CHANGE PASSWORD
                </ResetHeaderTitle>
            </Body>
            <Right />
        </ResetHeader>
    );

    render() {
        return (
            <Content>
                {this.inputCurrentPassword({ inputTitle: 'Current Password', inputMsg: 'Your Current Password' })}
                {this.inputNewPassword({ inputTitle: 'New Password', inputMsg: 'New Password' })}
                {this.inputNewConfirmPassword({ inputTitle: 'Confirm New Password', inputMsg: 'Confirm New Password' })}
                {
                    this.state.errInfo ?
                        this.state.errInfo.map((msg, index) => (
                            <HermoText key={index} color="Red" style={{ textAlign: 'center', marginTop: 5 }} >{msg.text}</HermoText>
                        )) : null
                }
                {
                    this.state.successInfo ?
                        this.state.successInfo.map((msg, index) => (
                            <HermoText key={index} style={{ textAlign: 'center', marginTop: 5, color: 'green' }} >{msg.text}</HermoText>
                        )) : null
                }
                <View style={style.button}>
                    <Button onPress={() => this.onResetPasswordHandler()} style={{ marginTop: 30, backgroundColor: colorPalette.LightSlateGrey }} >
                        {
                            this.props.resetLoading ?
                                <Spinner color="#9a9a9a" /> :
                                <Text style={{ color: colorPalette.White, fontSize: 14, lineHeight: 16, marginTop: 13, marginBottom: 13, marginLeft: 72, marginRight: 72 }}>SAVE CHANGES</Text>
                        }
                    </Button>
                </View>
            </Content>
        );
    }
}

ResetPasswordScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    resetData: selectResetData(),
    resetLoading: selectResetLoading(),
    resetError: selectResetError(),

});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'resetPasswordScreen', reducer });
const withSaga = injectSaga({ key: 'resetPasswordScreen', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ResetPasswordScreen);
