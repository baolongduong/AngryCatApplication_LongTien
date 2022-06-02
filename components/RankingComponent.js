import React, { Component } from 'react';
import { Image, StatusBar, Box, HStack, Text, Avatar, Icon, Center, Heading, Stack, Link, Button, AspectRatio, ScrollView, VStack } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/colorbackground.png" };

class Ranking extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <ScrollView>
            <Center>

              <Box mt="2" alignItems="center">
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
                  <VStack p="4" space={4} flex="1">
                  <Avatar bg="green.500" source={{
      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }}></Avatar>
    <Text>Your name</Text>
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