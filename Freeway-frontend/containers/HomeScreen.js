import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button,
  Text,
} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import Data from '../assets/data/data.js';
import CardContent from './Card.js';
import styles from '../assets/styles/styles.js';
import SlidingPanel from 'react-native-sliding-up-down-panels';

const {width, height} = Dimensions.get('window');

// const HomeScreen = () => {
//   return (
//     <View style={styles.containerHome}>
//       <CardStack
//         loop={true}
//         verticalSwipe={false}
//         renderNoMoreCards={() => null}
//         ref={swiper => (this.swiper = swiper)}>
//         {Data.map((profile, index) => (
//           <Card key={index}>
//             <CardContent
//               image={profile.image}
//               name={profile.name}
//               location={profile.location}
//               bio={profile.bio}
//               actions
//               onPressLeft={() => this.swiper.swipeLeft()}
//               onPressRight={() => this.swiper.swipeRight()}
//             />
//           </Card>
//         ))}
//       </CardStack>
//     </View>
//   );
// };

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles1.container}>
        <View>
          <View style={styles.containerHome}>
            <CardStack
              loop={true}
              verticalSwipe={false}
              renderNoMoreCards={() => null}
              ref={swiper => (this.swiper = swiper)}>
              {Data.map((profile, index) => (
                <Card key={index}>
                  <CardContent
                    image={profile.image}
                    name={profile.name}
                    location={profile.location}
                    bio={profile.bio}
                    actions
                    onPressLeft={() => this.swiper.swipeLeft()}
                    onPressRight={() => this.swiper.swipeRight()}
                  />
                </Card>
              ))}
            </CardStack>
          </View>
        </View>

        <SlidingPanel
          headerLayoutHeight={100}
          headerLayout={() => (
            <View style={styles1.headerLayoutStyle}>
              <Text style={styles1.commonTextStyle}>Start New Search</Text>
            </View>
          )}
          slidingPanelLayout={() => (
            <View style={styles1.slidingPanelLayoutStyle}>
              <Text style={styles1.commonTextStyle}>
                Enter task description
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLayoutStyle: {
    width,
    height: 100,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slidingPanelLayoutStyle: {
    width,
    height,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonTextStyle: {
    color: 'black',
    fontSize: 18,
  },
});

//export default HomeScreen;
