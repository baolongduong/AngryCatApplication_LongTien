import React, { Component } from 'react';
import { Image, StatusBar, Box, HStack, Text, Avatar, Icon, Center, Heading, Stack, Link, Button, AspectRatio, ScrollView, VStack } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/colorbackground.png" };
import * as SecureStore from 'expo-secure-store'

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
    }
  }

  render() {
    SecureStore.getItemAsync('userinfo').then(data=>{
    let UserInfo = JSON.parse(data);
    if(UserInfo)
    {
      const {Username, Password} = UserInfo;
      this.setState({ Username, Password });
    }    
    })
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <ScrollView>
            <Center>
              <Box alignItems="center">
                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="#fdf5d8" borderWidth="1" _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700"
                }} _web={{
                  shadow: 2,
                  borderWidth: 0
                }} _light={{
                  backgroundColor: "gray.50"
                }}>
                  <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                      <Image source={{
                        uri: "https://angrycatblnt.herokuapp.com/images/angrycatranking.png"
                      }} alt="image" />
                    </AspectRatio>
                  </Box>
                <VStack p="2" space={4} flex="1" backgroundColor="white.100">
                    <Text>{this.state.Username}</Text>
                    <Text>{this.state.Password}</Text>
                  </VStack>  
                </Box>
              </Box>
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


export default Ranking;