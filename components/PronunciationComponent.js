import React, { Component } from 'react';
import { Divider, Alert, Box, HStack, Text, IconButton,CloseIcon, Icon, Center, Heading, Stack, Link, Button, AspectRatio, ScrollView, VStack } from 'native-base';
import { ImageBackground, StyleSheet, View, TouchableOpacity } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/colorbackground.png" };
import * as SecureStore from 'expo-secure-store';
import { Audio } from 'expo-av';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, child, onValue } from 'firebase/database';

const TransAlert = () =>
{
  <Center>
  <Alert w="90%" maxW="400" status="info" colorScheme="info">
  <VStack space={2} flexShrink={1} w="100%">
    <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
      <HStack flexShrink={1} space={2} alignItems="center">
        <Alert.Icon />
        <Text fontSize="md" fontWeight="medium" color="coolGray.800">
          We are going live in July!
        </Text>
      </HStack>
      <IconButton variant="unstyled" _focus={{
      borderWidth: 0
    }} icon={<CloseIcon size="3" color="coolGray.600" />} />
    </HStack>
    <Box pl="6" _text={{
    color: "coolGray.600"
  }}>
      We are happy to announce that we are going live on July 28th. Get
      ready!
    </Box>
  </VStack>
</Alert>
</Center>
}

class Pronunciation extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    // return <TransAlert></TransAlert>
    
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
                    English alphabet has 26 letters of the alphabet which represent 44 sounds. It's include 20 vowel sounds, 24 consotants sounds. Let's start with cards !
                  </Box>
                </VStack>
              </Box>
              <Box alignItems="center">
                <Box width={350} height={400} rounded="xl" overflow="hidden" borderColor="#cf8193" borderWidth="1" _dark={{
                  borderColor: "#cf8193",
                  backgroundColor: "gray.700"
                }} _web={{
                  shadow: 2,
                  borderWidth: 0
                }} _light={{
                  backgroundColor: "gray.50"
                }}>
                  <Stack p="4" space={4}>
                    <Stack space={2}>
                      <Heading textTransform="uppercase" color="gray.700" textAlign="center" size="xs" ml="-1">
                        {this.state.type}
                      </Heading>
                      <Text textAlign="center" fontSize="xs" _light={{
                        color: "lime.700"
                      }} _dark={{
                        color: "violet.400"
                      }} fontWeight="500" ml="-0.5" mt="-1">                       
                        {this.state.example}
                      </Text>
                    </Stack>
                    <Heading textAlign="center" size="3xl" ml="-1">
                      {this.state.pronunciation}
                    </Heading>
                    <Button backgroundColor="#cf8193" alignSelf="center" borderRadius={100} width={20} onPress={() => this.pronunciationPlay()} ><Icon size="2xl" color="white" icon as={MaterialIcons} name="play-arrow" /></Button>
                    <Text fontSize={{base: "xs", md: "md", lg:"xl"}} _ fontWeight="400">
                      {this.state.description}                                        
                    </Text>
                    <Link pl={250} _text={{
                        color: "gray.500",
                        fontSize: "xs",
                      }} onPress={()=>this.setTranslate()}>
                        Translate
                      </Link>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                     
                      </HStack>
                      {/* <HStack>                     
                       <Text color="coolGray.600" size="xs" _dark={{
                          color: "warmGray.200"
                        }} fontWeight="100">
                            {this.state.translate}
                        </Text>
                      </HStack>                    */}
                  </Stack>
                </Box>
              </Box>
              <HStack backgroundColor="white" borderRadius={100} alignItems="center" mt={4} space={4} justifyContent="space-between">
              <Button isDisabled={this.setDisableforPrevious()} backgroundColor="lime.500" alignSelf="center" borderRadius={100}  width={10} onPress={() => this.previousPronunciation()} ><Icon size="md" color="white" icon as={Ionicons} name="arrow-back-circle-outline" /></Button>
              <Text color="lime.700">{this.state.id}</Text>
              <Button isDisabled={this.setDisableforNext()} backgroundColor="lime.500" alignSelf="center" borderRadius={100} width={10} onPress={() => this.nextPronunciation()} ><Icon size="md" color="white" icon as={Ionicons} name="arrow-forward-circle-outline" /></Button>
              </HStack>           

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


export default Pronunciation;