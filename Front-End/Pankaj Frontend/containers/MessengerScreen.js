import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import styles from '../assets/styles/styles.js';
import Data from '../assets/data/data.js';
import Message from './Message.js';

const MessengerScreen = () => {
  return (
    <View>
      <ScrollView>
        <View style={styles.top}>
          <TouchableOpacity></TouchableOpacity>
        </View>

        <FlatList
          data={Data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity>
              <Message
                image={item.image}
                name={item.name}
                lastMessage={item.message}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default MessengerScreen;
