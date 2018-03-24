// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Alert,
    Platform
} from 'react-native';
import * as constants from '../../styles/constants';
import * as actions from './actions';
import logo from '../../assets/images/green-up-logo.png';
import facebookLogo from '../../assets/images/facebook-logo.png';
import googleLogo from '../../assets/images/google-logo.png';
import LoginForm from '../../components/login-form';
import {defaultStyles} from '../../styles/default-styles';


const myStyles = {
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },
    logoText: {
        fontSize: 36,
        color: 'white',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        shadowRadius: 1
    },
    socialLoginButton: {
        width: '100%',
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        shadowRadius: 2, flex: 1, flexDirection: 'row'
    },
    socialLoginLogo: {
        padding: 10,
        width: 40,
        alignSelf: 'flex-start'
    },
    socialLogin: {flex: 1},

    socialLoginText: {
        fontSize: 16,
        fontWeight: '700',
        height: 40,
        padding: 10,
        color: 'white'
    },

    logos: {
        width: 20,
        height: 20
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class Login extends Component {

    static propTypes = {
        actions: PropTypes.object,
        loginError: PropTypes.any,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Log In'
    };

    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(nextProps) {
        if (!!nextProps.loginError) {
            Alert.alert(
                '',
                (nextProps.loginError.message || 'Login Failed'),
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            );

        }
    }


    googleLogin = () => {
        this.props.actions.isLoggingInViaSSO(true);
        return this.props.actions.googleLogin();
    };


    facebookLogin = () => {
        this.props.actions.isLoggingInViaSSO(true);
        return this.props.actions.facebookLogin();
    };

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.frame}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <View style={styles.container}>
                    <View style={styles.logo}>
                        <Image source={logo} style={{height: 120, width: 120}}/>
                        <Text style={styles.logoText}>Green Up Vermont</Text>
                    </View>
                    <ScrollView style={styles.scroll}>
                        <TouchableOpacity
                            style={styles.socialLoginButton}
                            onPress={this.googleLogin}>
                            <View style={[styles.socialLoginLogo, {backgroundColor: 'white'}]}>
                                <Image source={googleLogo} style={styles.logos}/>
                            </View>
                            <View style={[styles.socialLogin, {backgroundColor: '#4688f1'}]}>
                                <Text style={styles.socialLoginText}>Log in with Google</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.socialLoginButton}
                            onPress={this.facebookLogin}>
                            <View style={[styles.socialLoginLogo, {
                                backgroundColor: '#415893'
                            }]}>
                                <Image style={styles.logos} source={facebookLogo}/>
                            </View>
                            <View style={[styles.socialLogin, {backgroundColor: '#2d3f67'}]}>
                                <Text style={[styles.socialLoginText, {alignSelf: 'stretch'}]}>
                                    Log in with Facebook
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={[styles.text, {textAlign: 'center', marginTop: 20}]}> - OR - </Text>
                        <View style={{width: '100%'}}>
                            <LoginForm onButtonPress={this.props.actions.loginWithEmailPassword}/>
                            <TouchableHighlight
                                style={styles.link}
                                onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                                <Text style={styles.linkText}>I forgot my password</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.link}
                                onPress={() => this.props.navigation.navigate('CreateNewAccount')}>
                                <Text style={styles.linkText}>Create a new account</Text>
                            </TouchableHighlight>
                        </View>


                        {
                            Platform.OS === 'ios'
                                ? (<View style={defaultStyles.padForIOSKeyboardBig}/>)
                                : null
                        }
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.login.user,
    initialAuthChecked: state.login.initialAuthChecked,
    loginError: state.login.loginError
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
