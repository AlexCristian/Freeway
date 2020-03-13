import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {Image} from 'react-native' ; 
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createAppContainer} from '@react-navigation/stack';


export default class ProfileScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        dataSource: null,
      }
    }
  
    componentDidMount(){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: myHeaders,
        redirect: 'follow'
      };
      return fetch("http://freeway.eastus.cloudapp.azure.com:8000/api/profile", requestOptions)
        .then(response => response.json())
        .then(result => {
          this.setState({
            isLoading: false,
            dataSource: result,
          });
        })
        .catch(error => console.log('error', error));
    }
    
    render() {
  
      if (this.state.isLoading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator />
          </View>
        )
      }
      else {
        var bio = this.state.dataSource.bio;
        var location = this.state.dataSource.location;
        return(
          <ScrollView contentContainerStyle ={styles.scrollView} style={{flex:1}} >
          <Text style = {{paddingTop: '2%', paddingLeft: '5%', fontSize: 30}}>User Profile</Text>
          <Image
              style={{width: 300, height: 300, alignSelf: 'center', justifyContent: 'center'}}
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
            />
    
          <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 25}}>Name</Text>
          
          <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 25}}>{bio}</Text> 
    
    
          <View style={{flexDirection: 'row', justifyContent: 'space-between', flexGrow:1}}>
            <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Email</Text>
            <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
          </View>
    
          <View style={{flexDirection: 'row', justifyContent: 'space-between', flexGrow:1}}>
            <Text style = {{paddingTop: '3%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Nickname:</Text>
            <Text style = {{paddingTop: '3%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
          </View>
    
          <View style={{flexDirection: 'row', justifyContent: 'space-between', flexGrow:1}}>
            <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>City:</Text>
            <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>{location} </Text> 
          </View>
          
          <TouchableOpacity onPress={() => this.props.navigation.navigate('FAQ')} style={styles.backButton} >
            <Text >
                Help?
            </Text>
          </TouchableOpacity >
    
        </ScrollView>
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