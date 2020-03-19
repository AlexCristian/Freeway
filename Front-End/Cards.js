import React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import styles from './assets/styles/styles.js';
const {width, height} = Dimensions.get('window');

const CardItem = ({actions, bio, image, name, location, variant, onPressLeft, onPressRight, navigateCard}) => {


  const imageStyle = [
    {
      alignSelf: 'center',
      flexGrow: 1,
      borderRadius: 8,
      width: 350,
      height: 350 ,
      height: 350,
      margin: 10,
    },
  ];

  

  const nameStyle = [
    {
      alignSelf: 'center',
      paddingTop: variant ? 10 : 15,
      paddingBottom: variant ? 5 : 7,
      color: '#363636',
      fontSize: variant ? 15 : 30,
    },
  ];

  return (
    <View style={styles.containerCardItem}>
      <Image source={image} style={imageStyle} />

      <Text style={nameStyle}>{name}</Text>

      <Text>Philadelphia</Text>

      {bio && <Text style={styles.descriptionCardItem}>{bio}</Text>}


      {actions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
            <Text>Dislike</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={{width: 90,
            height: 90,
            borderRadius: 30,
            backgroundColor: '#FFFFFF',
            marginHorizontal: 7,
            alignItems: 'center',
            justifyContent: 'center',
            shadowOpacity: 0.15,
            shadowRadius: 20,
            shadowColor: '#363636',
            shadowOffset: {height: 10, width: 0},}}
            onPress={() => navigateCard()}>
            <Text>New Search</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.button} onPress={() => onPressRight()}>
            <Text>Like</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardItem;
