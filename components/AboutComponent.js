import React, { Component, useState, useEffect, useContext } from 'react';
import { Image, StatusBar, Box, HStack, Text, Avatar, Modal, Badge, Center, Heading, FormControl, Link, Button, AspectRatio, ScrollView, VStack, border, Input } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowBackground.png" };
import * as SecureStore from 'expo-secure-store'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { getDatabase, ref, child, push, set, get } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';


class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }




  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Center>
           
            <HStack justifyContent="center" width={400} height={250} borderRadius="30" borderColor="black" >
              <VStack space={4} flex="0.85" backgroundColor="white" borderColor="black"  borderRadius="10">
             
                <View>
                <Heading mt={3} alignSelf="center"  fontSize="3xl" fontWeight="light" color="#cf8193">
                                About Us?
                            </Heading>               
                  <Box p={4} >
                  <Text pb={3} fontSize="md" color="pink.500" bold>Name: 
                <Text color="blueGray.800" fontWeight="light"> Angry Cat</Text>
                </Text>

                <Text pb={3} fontSize="md" color="pink.500" bold>Developed by: 
                <Text color="blueGray.800" fontWeight="light"> Bao Long, Ngoc Tien</Text>
                </Text>

                <Text pb={3} fontSize="md" color="pink.500" bold>Published: 
                <Text color="blueGray.800" fontWeight="light"> xx/07/2022</Text>
                </Text>

                <Text pb={3} fontSize="md" color="pink.500" bold>Contact: 
                <Text color="blueGray.800" fontWeight="light"> 0911223344</Text>
                </Text>

                  </Box>
                </View>
              </VStack>
            </HStack>
          </Center>



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


export default About;