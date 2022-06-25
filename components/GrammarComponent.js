import React, { Component } from 'react';
import { Image, StatusBar, Box, HStack, Text, Avatar, Icon, Center, Heading, Stack, Link, Button, AspectRatio, ScrollView, VStack } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/colorbackground.png" };
import * as SecureStore from 'expo-secure-store'

class Grammar extends Component {
  constructor(props) {
    super(props);   
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <ScrollView>
            <Center>
                  <VStack p="2" space={4} flex="1" backgroundColor="white.100">
                    <Text>Grammar</Text>
                  </VStack>            
            </Center>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  }
});


export default Grammar;