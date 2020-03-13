import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {Image} from 'react-native' ; 
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createAppContainer} from '@react-navigation/stack';


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        isLoading: true,
        dataSource: null,
        loginAttempt: false,
        }
    }

    componentDidMount(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"email":"test@test.com","oauthid":"123456"});

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