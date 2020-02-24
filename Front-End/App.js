import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {Image} from 'react-native' ; 
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>

        <Image source={require('./assets/Logo.png')} style={{width: 200, height: 200}} />

        <Text style={{fontSize: 40}}>Freeway</Text>

        <Text style={{fontSize: 20}}>Welcome to our application!</Text>
        
        <Text style={{flexWrap: 'wrap', textAlign: 'center'}}>Our mission is to provide a way for humans to help one another through a simple matching process</Text>
        <Text>{' '}{' '}</Text>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Profile')}
        />

      </View>
  );
}

function Profile({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>

      <Button
          title="Go to FAQs"
          onPress={() => navigation.navigate('FAQ')}
        />
    </View>
  );
}

function FAQ({navigation}) {
  return (
    <ScrollView contentContainerStyle ={styles.scrollView}>
      <Text style = {{paddingTop: '5%', paddingLeft: '5%', fontSize: 30}}>Welcome the FAQ Page</Text>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 16}}>Below you'll find our answers to some of the more common problems people have!</Text>

      <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>

      <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>

      <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>

      <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="FAQ" component={FAQ} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  scrollView: {
    
    alignItems: 'flex-start'
  }
});

const Stack = createStackNavigator();
