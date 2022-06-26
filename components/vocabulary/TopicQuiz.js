import React, { Component } from 'react';
import { Divider, Image, Box, HStack, Text, IconButton,CloseIcon, Icon, Center, Heading, Stack, Link, Button, AspectRatio, ScrollView, VStack } from 'native-base';
import { ImageBackground, StyleSheet, View, TouchableOpacity } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/colorbackground.png" };
import * as SecureStore from 'expo-secure-store';
import { Audio } from 'expo-av';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, child, onValue } from 'firebase/database';


class TopicQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
        vocab: [],
      id: 1,
      type: 'Test state',
      example: '',
      pronunciation: '',
      mp3: '',
      description: '',
      translate: '',
    }
  }

  componentDidMount() {
    const dbRef = ref(getDatabase());
    onValue(child(dbRef, 'pronunciation/' + this.state.id), (snapshot) => {
      const value = snapshot.val();
      this.setState({
        id: value.id,
        type: value.type,
        example: value.example,
        pronunciation: value.pronunciation,
        mp3: value.mp3,
        description: value.description,
        translate: value.translate
      });
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.id !== this.state.id) {
      this.componentDidMount();
    }
  }

  nextPronunciation = (value) => {
    this.setState(previousState => ({ id: previousState.id + 1 }));
  }
  previousPronunciation = () => {
    this.setState(previousState => ({ id: previousState.id - 1 }));
  }

  setDisableforPrevious(value)
  {
    if(this.state.id == 1)
    {
      return value = true
    }   
  }

  setDisableforNext(value)
  {
    if(this.state.id == 44)
    {
      return value = true
    }  
  }
 
  setTranslate()
  {
     alert(this.state.translate);
    
  }


  pronunciationPlay = async () => {
    console.log(this.state.mp3)
    const { sound } = await Audio.Sound.createAsync(
      { uri: this.state.mp3 }, { shouldPlay: false });
    await sound.playAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <ScrollView>
            <Center>
              <Box border="1" borderRadius="md">
                <VStack space="4" divider={<Divider />}>              
                  <Box px="4" pt="4" pb="4">
                  <Heading color="#cf8193" size="lg" ml="-1">
                     Colors Colors Colors
                    </Heading>
                  </Box>
                </VStack>
              </Box>
              
              <Box backgroundColor="white" width={200} height={200} rounded="xl" overflow="hidden" borderColor="#cf8193" borderWidth="1" alignItems="center">
                      <Image w="100%" source={{
                        uri: "https://www.mdsoft.com.vn/images/noimage.png"
                      }} alt="image" />
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


export default TopicQuiz;