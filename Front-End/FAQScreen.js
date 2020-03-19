import React from 'react';
import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';

export default class FAQScreen extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle ={styles.scrollView}>
                <Text style = {{paddingTop: '2%', paddingLeft: '5%', fontSize: 30}}>Welcome the FAQ Page</Text>
                <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 16}}>Below you'll find our answers to some of the more common problems people have!</Text>
        
                <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
                <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>
        
                <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
                <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>
        
                <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
                <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>
        
                <Text style = {{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
                <Text style = {{paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', fontSize: 13}}>Maecenas tortor nisl, porttitor at molestie in, efficitur id nibh. Vivamus congue leo turpis, id iaculis quam imperdiet et. Aliquam rhoncus pulvinar erat non vulputate. Fusce nec commodo tellus. Nulla et diam magna. Suspendisse et nibh lectus. Duis ac ullamcorper nulla. Quisque in nulla sit amet dolor sagittis vulputate ac sit amet nibh. Sed sit amet velit laoreet, bibendum neque sed, faucibus nulla. Quisque quis lacinia felis.</Text>

                <TouchableOpacity onPress={() => this.props.navigation.pop()} style={styles.backButton} >
                    <Text >
                        Go Back
                    </Text>
                </TouchableOpacity >
        </ScrollView>
        );
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