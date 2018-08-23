/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,

    RefreshControl,
    FlatList,
    DatePickerAndroid,
    TextInput,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import CheckBox from 'react-native-check-box';
import { Button } from 'react-native-elements';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { axios } from 'axios';


export default class Login extends Component {
    static navigationOptions = { title: 'Welcome', header: null };
    constructor(props) {
        super(props);
        this.state = {
            name: '', date: '', photos: '', refreshing: false, person: []
        };

    }
    onRefresh = () => {
        this.setState({ refreshing: true });
        this.fetchData().then(() => {
            this.setState({ refreshing: false });
        });
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
        this.fetchData();
    }
    render() {
        return (
            <ScrollView style={{ width: '100%', height: '100%', backgroundColor: '#40c4ff' }}>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 20, marginStart: 20, marginEnd: 20, }}>
                    <Text>ລົງທະບຽນກັບ Hello World</Text>
                    <TextInput
                        ref={(name) => { this.name = name; }}
                        onChangeText={(name) => this.setState({ name: name })}
                        value={this.state.name}
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
                        placeholder='name'
                    />
                    <TextInput
                        ref={(dob) => { this.dob = dob; }}
                        onChangeText={(dob) => this.setState({ date: dob })}
                        value={this.state.date}
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
                        placeholder='Date of birth'
                    />
                    <Button
                        title='Pick date'
                        onPress={this.getPickDate}
                    />
                    <Button
                        title='upload'
                        onPress={this.SendUpload}
                    />
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                        data={this.state.dataSource}
                        renderItem={({ item }) => <Text>{item.PD_name}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                    {/* <Text>
                        {this.state.person.map(person => <Text>{person.username}</Text>)}
                    </Text> */}
                </View>
            </ScrollView>
        );
    }
    getPickDate = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            });
            if (action == DatePickerAndroid.dateSetAction) {
                this.setState({ date: (day + '-' + month + '-' + year) })
            }

        } catch ({ code, message }) {

        }
    }
    SendUpload = () => {
        fetch('http://192.168.8.105:4000/goteddy/addAdmin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'DDDDDDD',
                password: '362117213Cb',
            }),
        });

    }
    fetchData = () => {
        // To check Account registered
         return fetch('http://192.168.8.105:4000/goteddy/Product')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
        // Make a request for a user with a given ID
        // axios.get('http://192.168.8.105:4000/goteddy/Admin')
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }

}