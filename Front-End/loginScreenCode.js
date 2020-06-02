componentDidMount(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"email":"a@gmail.com","oauthid":"123456"});

    var requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return fetch("http://freeway.eastus.cloudapp.azure.com:8000/api/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            this.setState({
            isLoading: false,
            dataSource: result,
            });
        })
        .catch(error => console.log('error', error));
    
}

//setTrue = () => {
    //this.setState({loginAttempt: true})
//}

    
  
    render() {

        if (this.state.LoginAttempt == true) {
            this.props.navigation.navigate('Profile')
        }
            
        
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                <ActivityIndicator />
                </View>
            )
        }
        else {
            return (
                <View style={styles.login}>
            
                    <Image source={require('./assets/Logo.png')} style={{width: 200, height: 200}} />
            
                    <Text style={{fontSize: 40}}>Freeway</Text>
            
                    <Text style={{fontSize: 20}}>Welcome to our application!</Text>
                    
                    <Text style={{flexWrap: 'wrap', textAlign: 'center'}}>Our mission is to provide a way for humans to help one another through a simple matching process</Text>
                    <Text>{' '}{' '}</Text>

                    <TouchableOpacity onPress={() => this.setState({LoginAttempt: true})} >
                        <Text >
                            Login
                        </Text>
                    </TouchableOpacity >
            
                    
            
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({

    login:{
      flexGrow:1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
  
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
  
    scrollView: {
      alignItems: 'stretch',
  
  
    },
  
    backButton: {
      alignSelf: "flex-end",
      alignItems:'center',
      backgroundColor: '#aaa',
      margin: 20,
      padding: 10,
    }
  
  });  




















  import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, RecyclerViewBackedScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {Image} from 'react-native' ; 
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createAppContainer} from '@react-navigation/stack';
import * as Google from 'expo-google-app-auth';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginAttempt: false,
            signedIn: false,
            name: "",
            photoUrl: "",
            email: "",
            userInfo: null,
            idToken: null
        }
    }

    enrollUser(){
        makeLogin(this).catch(error => {
            // User needs to sign up first
            signUpUser(this).then(resp => {
                makeLogin(this)
            })
        })
        
    }


    getGoogleProfile = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "742738163356-hf5tdgnfa5dec8e5ii42jr28lugkc6ak.apps.googleusercontent.com",
                iosClientId: "742738163356-tpo7qt8cvqno2cs739k8uh7sp9c9oq58.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            })
    
            if (result.type === "success") {
                this.setState({
                    name: result.user.name,
                    photoUrl: result.user.photoUrl,
                    email: result.user.email,
                    idToken: result.idToken
                })
                
                this.enrollUser()
            } 
            else {
                console.log("cancelled")
            }
        }
        catch (e) {
            console.log("Get Google profile error", e)
        }
        
    } 

    
    render() {
        
        return (
            <View style={styles.container}>
            {this.state.signedIn ? (
                this.props.navigation.navigate('Profile')
                
            ) : (
                <LoginPage getGoogleProfile={this.getGoogleProfile} />
            )}
            </View>
        )
    }
}

function makeLogin(context) {
    return new Promise(function (resolve, reject) {
        email = context.state.email
        idToken = context.state.idToken
        
        console.log("Making Login");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"email":email,"oauthid":idToken});

        var requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://freeway.eastus.cloudapp.azure.com:8000/api/login", requestOptions)
            .then(result => {
                if (result.ok){
                    context.setState({signedIn: true})
                    console.log("Login success.")
                    resolve(result.text)
                } else {
                    console.log("Login fail.")
                    reject(result.status)
                }
            })
            .catch(error => console.log('Login error', error));
    })
}

function signUpUser(context) {
    return new Promise(function (resolve, reject) {
    console.log("signup")

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    name = context.state.name
    photoURL = context.state.photoUrl
    email = context.state.email
    idToken = context.state.idToken

    var raw = JSON.stringify({"email":email,"oauthid":idToken,"name":name, "photourl":photoURL, "location":" ", "bio":" "});

    console.log(raw)

    var requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://freeway.eastus.cloudapp.azure.com:8000/api/signup", requestOptions)
        .then(result => {
            if (result.ok){
                console.log("Signup success.")
                resolve(result.text)
            } else {
                console.log("Signup fail.")
                reject(result.status)
            }
        })
        .catch(error => console.log('Signup error', error));
    })
}

    
const LoginPage = props => {
    return (
        <View>
            <Text style={styles.header}>Sign In With Google</Text>
            <Button title="Sign in with Google" onPress={() => props.getGoogleProfile()} />
        </View>
    )
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
        },
        header: {
        fontSize: 25
        },
        image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
    }
})