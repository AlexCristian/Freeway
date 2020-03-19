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
          newName: '',
          newDesc: '',
          newLoc: '',
  
        }
      }
    
    render() {

        return(
            <ScrollView contentContainerStyle ={styles.scrollView} style={{flex:1}} >
                <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={styles.backButton} >
                        <Text >
                            Profile
                        </Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Messenger')} style={styles.backButton} >
                        <Text >
                            Messages
                        </Text>
                    </TouchableOpacity >
                </View>

                <Text style = {{paddingTop: '2%', paddingLeft: '5%', justifyContent: 'center', fontSize: 30}}>Search for Volunteers</Text>
    
                <View style={{alignItems: 'center'}}>
                    <TextInput style={{alignSelf: 'left', paddingLeft: '5%', paddingRight: '5%', borderWidth: 1, height: 40, width: 300, fontSize: 13}} placeholder={"Task Name"} onChangeText={(newName) => this.setState({newName})} value={this.state.newName}/>
                </View>

                <View style={{alignItems: 'center'}}>
                    <TextInput style={{paddingLeft: '5%', paddingRight: '5%', borderWidth: 1, width: 300, fontSize: 13}} placeholder={"Task Description"} multiline numberOfLines={4} onChangeText={(newDesc) => this.setState({newDesc})} value={this.state.newDesc}/>
                </View>

                <View style={{alignItems: 'center'}}>
                    <TextInput style={{paddingLeft: '5%', paddingRight: '5%', borderWidth: 1, height: 40, width: 300, fontSize: 13}} placeholder={"Location"} onChangeText={(newLoc) => this.setState({newLoc})} value={this.state.newLoc}/>
                </View>
                

                <View style={{flexDirection: 'column', justifyContent: 'space-between', flexGrow:1, margin: 20, padding: 10}}>
                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.backButton} >
                        <Text >
                            Search
                        </Text>
                    </TouchableOpacity >
                </View>

            </ScrollView>
        )
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