import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';
import {Image} from 'react-native' ; 
import 'react-native-gesture-handler';



export default class ProfileScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        dataSource: null,
        newEmail: '',
        newLoc: '',

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
        var email = this.state.dataSource.email;
        var name = this.state.dataSource.name;
        var photourl = this.state.dataSource.photourl

        return(
          <ScrollView contentContainerStyle ={styles.scrollView} style={{flex:1}} >
          <Text style = {{paddingTop: '2%', paddingLeft: '5%', fontSize: 30}}>User Profile</Text>
          <Image
              style={{width: 300, height: 300, alignSelf: 'center', justifyContent: 'center'}}
              source={{uri: photourl}}
            />
    
          <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 25}}>{name}</Text>
          
          <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', fontSize: 25}}>{bio}</Text> 
    
    
          <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style = {{paddingLeft: '5%', fontSize: 13}}>Email</Text>
            <TextInput style={{paddingLeft: '5%', paddingRight: '5%', height: 40, fontSize: 13}} placeholder={email} onChangeText={(newEmail) => this.setState({newEmail})} value={this.state.newEmail}/>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style = {{paddingLeft: '5%', fontSize: 13}}>City:</Text>
            <TextInput style={{paddingLeft: '5%', paddingRight: '5%', height: 40, fontSize: 13}} placeholder={location} onChangeText={(newLoc) => this.setState({newLoc})} value={this.state.newLoc}/>
          </View>
          

          <View style={{flexDirection: 'row', justifyContent: 'space-between', flexGrow:1, margin: 20, padding: 10}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('NewTask')} style={styles.backButton} >
              <Text >
                  Create Task
              </Text>
            </TouchableOpacity >

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.backButton} >
              <Text >
                  Logout
              </Text>
            </TouchableOpacity >
            
            <TouchableOpacity onPress={() => this.props.navigation.navigate('FAQ')} style={styles.backButton} >
              <Text >
                  Help?
              </Text>
            </TouchableOpacity >
          </View>
    
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