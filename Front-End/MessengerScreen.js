import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import styles from './assets/styles/styles.js';
import Message from './Message.js';

export default class MessengerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: '',
      id: '',
      name: '',
      photourl: '',
      lastmsg: '',

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
    return fetch("http://freeway.eastus.cloudapp.azure.com:8000/api/conversations", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
          isLoading: false,
          dataSource: result,

        })
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }


  render() {
    var info = Array.from(this.state.dataSource)
    console.log(info)
    
    return (
      <View style= {{flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <FlatList
            data={info}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity>
                <Message
                  image={item.photourl}
                  name={item.name}
                  lMessage={item.lastmsg}
                />
              </TouchableOpacity>
            )}
          />

        <TouchableOpacity onPress={() => this.props.navigation.pop()} style={styles.backButton} >
          <Text>
              Go Back
          </Text>
        </TouchableOpacity>


        </ScrollView>
      </View>
    )
  }
}
