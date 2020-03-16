import React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import styles from '../assets/styles/styles.js';

const CardItem = ({
  actions,
  bio,
  image,
  name,
  location,
  onPressLeft,
  onPressRight,
  variant,
}) => {
  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: variant ? 170 : 350,
      margin: variant ? 0 : 20,
    },
  ];

  const nameStyle = [
    {
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

      {actions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
            <Text>No</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressRight()}>
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardItem;
