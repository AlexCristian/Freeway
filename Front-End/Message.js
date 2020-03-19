import React from 'react';
import styles from './assets/styles/styles.js';

import {Text, View, Image} from 'react-native';

const Message = ({image, lMessage, name}) => {
  return (
    <View style={styles.containerMessage}>
      <Image source={image} style={styles.avatar} />
      <View style={styles.content}>
        <Text>{name}</Text>
        <Text style={styles.message}>{lMessage}</Text>
      </View>
    </View>
  );
};

export default Message;
