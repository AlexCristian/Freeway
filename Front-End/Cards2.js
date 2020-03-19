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

const CardItem = ({actions, bio, image, name, location, variant}) => {


  const imageStyle = [
    {
      alignSelf: 'center',
      flexGrow: 1,
      borderRadius: 8,
      width: 500,
      height: 500,
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

      <Text>{location}</Text>

      {bio && <Text style={styles.descriptionCardItem}>{bio}</Text>}

      <Text>Crendentials</Text>
      <Text>B.S. in Computer Science</Text>
      <Text>Testimonials</Text>
      <Text>He's a good person</Text>

      {actions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.button}>
            <Button title="Dislike"></Button>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Button title="Like"></Button>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardItem;
