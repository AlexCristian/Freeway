import React from 'react';
import {View, ImageBackground, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import CardContent from './Cards.js';

export default class SwipingScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: '',
      id: '',
      name: '',
      photourl: '',
      bio: '',

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
    return fetch("http://freeway.eastus.cloudapp.azure.com:8000/api/feed/p/b62d6580-1748-40ef-8a6d-240a49a5ae9d", requestOptions)
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
    var data = Array.from(this.state.dataSource)
    console.log(data)

    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent:'center', backgroundColor: '#F0F0F0'}}>
        <CardStack
          style={{alignItems: 'center', flex: 1, justifyContent:'center'}}
          loop={false}
          verticalSwipe={false}
          renderNoMoreCards={() => null}>
          {data.map((profile,  index) => (
            <Card key={index}>
              <CardContent
                image={profile.photourl}
                name={profile.name}
                bio={profile.bio}
                actions
                onPressLeft={() => this.swiper.swipeLeft()}
                onPressRight={() => this.swiper.swipeRight()}
              />
            </Card>
          ))}
        </CardStack>


        <TouchableOpacity onPress={() => this.props.navigation.pop()} style={styles.backButton} >
          <Text>
              Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

    

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