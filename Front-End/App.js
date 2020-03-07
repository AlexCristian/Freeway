import React from 'react';
import {StyleSheet, Text, View, Button, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {Image} from 'react-native' ; 
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MenuDrawer from 'react-native-side-drawer'

//Home
//Profile
//FAQ
//Swiping


function LoginScreen({navigation}) {
  return (
    <View style={styles.login}>

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
    <ScrollView contentContainerStyle ={styles.scrollView} style={{flex:1}} >
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', fontSize: 30}}>User Profile</Text>
      <Image
          style={{width: 300, height: 300, alignSelf: 'center', justifyContent: 'center'}}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />

      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 25}}>Name</Text>

      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', flexGrow:1}}>
        <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Email:</Text>
        <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', flexGrow:1}}>
        <Text style = {{paddingTop: '3%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Nickname:</Text>
        <Text style = {{paddingTop: '3%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', flexGrow:1}}>
        <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>City:</Text>
        <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      </View>
      
      
      


      <TouchableOpacity onPress={() => navigation.navigate('FAQ')} style={styles.backButton} >
        <Text >
            Help?
        </Text>
      </TouchableOpacity >

    </ScrollView>
  );
}

function FAQ({navigation}) {
  return (
    <ScrollView contentContainerStyle ={styles.scrollView}>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', fontSize: 30}}>Welcome the FAQ Page</Text>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 16}}>Below you'll find our answers to some of the more common problems people have!</Text>

      <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>

      <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>

      <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>

      <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>


      <TouchableOpacity onPress={() => navigation.pop()} style={styles.backButton} >
        <Text >
            Go Back
        </Text>
      </TouchableOpacity >

    </ScrollView>
    
  );
}

export default function App() {
  return (
    <NavigationContainer>
      

      <Stack.Navigator initialRouteName="Login" headerMode={'none'}>
        
        <Stack.Screen name="Login" component={LoginScreen} options={{gestureEnabled: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{gestureEnabled: false}}/>
        <Stack.Screen name="FAQ" component={FAQ} options={{gestureEnabled: false}}/>
      </Stack.Navigator>

    </NavigationContainer>
  )
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

const Stack = createStackNavigator();


