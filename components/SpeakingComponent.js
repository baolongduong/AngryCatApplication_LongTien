import React, { Component } from 'react';
import { Image, StatusBar, Box, HStack, Text, FlatList, Avatar, Icon, Center, Heading, Stack, Link, Button, AspectRatio, ScrollView, VStack } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowquiz.png" };
import * as SecureStore from 'expo-secure-store'
import { getDatabase, ref, get, child, onValue } from 'firebase/database';

class Speaking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      SpeakID: 0,
    }
  }
  componentDidMount() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'speaking/')).then((snapshot) => {
      // const words = snapshot.val();
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          Type: child.val().Type,
          Sentence: child.val().Sentence,
        })
      });
      this.setState({ data: items })
      // const getWords = words.words;
      console.log(this.state.data);
      // this.setState({ vocab: vocabData })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Center flex={1}>

            <VStack mt={2} >
              <Heading p="4" color="amber.800" textAlign="center">
                Speaking with paragraphs
              </Heading>
            </VStack>

            

            <Center flex={1}>
              <Box backgroundColor="white" pt={1} pb={2} mt={3} mb={3} height="100%" width="380" >
              
                <FlatList numColumns={1} data={this.state.data} renderItem={({
                  item
                }) => <Box borderBottomWidth="1" _dark={{
                  borderColor: "muted.50"
                }} borderColor="coolGray.200" py="8" pr="5" pl="5">
                  <Text _dark={{
                          color: "warmGray.50"
                        }} color="amber.700" fontSize="xl" bold>
                          {item.Type}
                        </Text>

                      <VStack alignSelf="center">
                        <Text color="coolGray.400" _dark={{
                          color: "warmGray.200"
                        }}>
                          {item.Sentence}
                        </Text>
                      </VStack>

                  </Box>}/>
              </Box>
            </Center>

         

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


export default Speaking;