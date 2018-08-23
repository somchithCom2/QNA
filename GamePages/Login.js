/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Text,
    Alert,
    View,
    ScrollView,
    Image,
    TextInput,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';



export default class Login extends Component {
    static navigationOptions = { title: 'Welcome', header: null };
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', remamber: false, userData: '' };
    }
    componentDidMount() {
        //To config your App with google Api
        GoogleSignin.configure({
            // whatever setup you need
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
            accountName: '', // [Android] specifies an account name on the device that should be used
            webClientId: '254387761247-o3g298qlv4j1ikgu7tqc6urmo0i9qfeq.apps.googleusercontent.com'
        });
        //To check Account registered
        this.getCurrentUser();
    }
    render() {
        return (
            <ScrollView style={{ width: '100%', height: '100%', backgroundColor: '#40c4ff' }}>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 40, marginStart: 20, marginEnd: 20, }}>
                    {/* create Logo */}
                    <Image
                        style={{ width: 120, height: 120 }}
                        source={require('./../GameAssets/Images/Icons/braint.png')}
                    />
                    {/* Welcome text */}
                    <Text style={{ marginTop: 60, fontSize: 15, }}>ຍິນດີຕ້ອນຮັບສູ່</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>IQ Plus+</Text>
                    <Text style={{ fontSize: 17, marginLeft: 15, marginTop: 10, marginBottom: 15, width: '100%', textAlign: 'left' }}>ກະລຸນາລ໋ອກອິນເພື່ອເຂົ້າສູ່ລະບົບ: </Text>
                    {/* Input phone number here */}
                    <TextInput
                        ref={(el) => { this.username = el; }}
                        onChangeText={(username) => this.setState({ username: username })}
                        value={this.state.username}
                        keyboardType='numeric'
                        textAlign='center'
                        underlineColorAndroid='transparent'
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            marginBottom: 10,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            fontSize: 17,
                        }}
                        placeholder='ປ້ອນຊື່ຜູ້ຫຼິ້ນ'
                    />
                    {/* Input password here */}
                    <TextInput
                        ref={(password) => { this.password = password; }}
                        onChangeText={(password) => this.setState({ password: password })}
                        value={this.state.password}
                        secureTextEntry={true}
                        textAlign='center'
                        underlineColorAndroid='transparent'
                        maxLength={30}
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            marginBottom: 10,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            fontSize: 17,
                        }}
                        placeholder='ປ້ອນລະຫັດຜ່ານ'
                    />
                    {/* save password */}
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: '100%' }}
                        onClick={() => this.RemamberPwd(this.state.remamber)}
                        isChecked={this.state.remamber}
                        rightText='ຈົດຈຳລະຫັດຜ່ານ'

                    />
                    {/* Manual login button */}
                    <Button
                        borderRadius={2}
                        buttonStyle={{
                            width: 300,
                            height: 45,
                        }}
                        backgroundColor={'#1565C0'}
                        onPress={this.ManualLogin}
                        title='ລ໋ອກອິນ'
                    />
                    <Text style={{marginBottom: 10, marginTop: 10,}}>ບໍ່ທັນມີບັນຊີ. <Text style={{fontStyle: 'italic', textDecorationLine: 'underline'}} onPress={() => this.props.navigation.navigate('register')}> ສ້າງບັນຊີໃໝ່ ?</Text></Text>
                    {/* Google sign in button */}
                    <GoogleSigninButton
                        style={{ width: 309, height: 50, }}
                        onPress={this.signIn}
                        onLoginFound={function (data) {
                            console.log("Existing login found.");
                            console.log(data);
                            // this.setState({ fb_user: data.credentials });
                        }}

                    />
                </View>
            </ScrollView>
        );
    }
    // Functiom Remember Pwd-----------------------------------------
    RemamberPwd = (data) => {
        if (data != true) {
            this.setState({ remamber: true })
        } else {
            this.setState({ remamber: false })
        }
    }
    ManualLogin = () => {

    }
    // Google sign in
    signIn = async () => {
        // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            Toast.show(JSON.stringify(userInfo))
            this.setState({ userData: userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happen
            }
        }
    };
    // get current user
    getCurrentUser = async () => {
        try {
            const silentuser = await GoogleSignin.signInSilently()
            this.setState({ userData: silentuser });
            // Toast.show(JSON.stringify(this.state.userData))

        } catch (error) {
            console.error(error);
        }
    };
    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ userData: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };
    // goToRegister = () => {
    //     app.props.navigations.navigate('register')
    // }
}
