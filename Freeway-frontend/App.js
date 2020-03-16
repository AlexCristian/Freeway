/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import 'react-native-gesture-handler';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './containers/HomeScreen';
import ProfileScreen from './containers/ProfileScreen';
import MessengerScreen from './containers/MessengerScreen';
import CardStack, {Card} from 'react-native-card-stack-swiper';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Messages" component={MessengerScreen} />
        </Tab.Navigator>
      }
    </NavigationContainer>
  );
}
