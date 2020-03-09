import React from 'react';
import {View, ImageBackground, Text} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import Data from '../assets/data/data.js';
import CardContent from './Card.js';

const HomeScreen = () => {
  return (
    <View>
      <CardStack
        loop={true}
        verticalSwipe={false}
        renderNoMoreCards={() => null}>
        {Data.map((profile, index) => (
          <Card key={index}>
            <CardContent
              image={profile.image}
              name={profile.name}
              location={profile.location}
              bio={profile.bio}
              actions
            />
          </Card>
        ))}
      </CardStack>
    </View>
  );
};

export default HomeScreen;
