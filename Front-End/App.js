import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {Image} from 'react-native' ; 
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createAppContainer} from '@react-navigation/stack';

import ProfileScreen from './ProfileScreen';
import LoginScreen from './LoginScreen';
import FAQScreen from './FAQScreen';
import HomeScreen from './HomeScreen';
import SwipingScreen from './SwipingScreen';
import MessengerScreen from './MessengerScreen';
import NewTask from './NewTask';

//Home
//Profile
//FAQ
//Swiping
//const Stack = createStackNavigator();

export default class App extends React.Component {
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerMode={'none'}>
          <Stack.Screen name="Login" component={LoginScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="FAQ" component={FAQScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="Swiping" component={SwipingScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="Messenger" component={MessengerScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="NewTask" component={NewTask} options={{gestureEnabled: false}}/>

        </Stack.Navigator>
      </NavigationContainer>
    )
  }  
}

const Stack = createStackNavigator(); 
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