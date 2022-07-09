import React, { Component } from 'react';
import { Divider, Alert, Box, HStack, Text, FlatList,Modal, IconButton, CloseIcon, Icon, Center, Heading, Stack, Link, Button, AspectRatio, ScrollView, VStack } from 'native-base';
import { ImageBackground, StyleSheet, View, TouchableOpacity } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowquiz.png" };
import * as SecureStore from 'expo-secure-store';
import { Audio } from 'expo-av';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, child, onValue, get } from 'firebase/database';
import * as Animation from 'react-native-animatable'

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
      pronunciationList: [],
      showModal: false,
    }
  }

  componentDidMount() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'pronunciation/')).then((snapshot) => {
      const value = snapshot.val();
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          id: child.val().id,
          type: child.val().type,
          pronunciation: child.val().pronunciation
        })
      });
      this.setState({ pronunciationList: items })
      // const getWords = words.words;
      // console.log(this.state.pronunciationList);
      // this.setState({ vocab: vocabData })
    });
  }

  pronunciationDetails(modalVisible, id) {
    const dbRef = ref(getDatabase());
    onValue(child(dbRef, 'pronunciation/' + id), (snapshot) => {
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
    this.setState({ showModal: modalVisible })
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
          <Center flex={1}>

            <VStack mt={3}>
              <Heading p="2" color="amber.800">
                How to learn ?
              </Heading>
            </VStack>

            <VStack mb={3}>
              <Box px="4">
                English alphabet has 26 letters of the alphabet which represent 44 sounds. It's include 20 vowel sounds, 24 consotants sounds. Let's start with cards !
              </Box>
            </VStack>

            <Center flex={1}>
              <Box backgroundColor="white" pt={1} pb={2} mt={3} mb={3} height="100%" width="380" >
              <Animation.View animation="fadeIn" duration={2000} delay={1000}>
                <FlatList numColumns={1} data={this.state.pronunciationList} renderItem={({
                  item
                }) => <Box borderBottomWidth="1" _dark={{
                  borderColor: "muted.50"
                }} borderColor="coolGray.200" py="7" pr="4" pl="4">
                    <HStack pl={2} pr={2} space={13} justifyContent="space-between" >
                      <VStack alignSelf="center">
                        <Text _dark={{
                          color: "warmGray.50"
                        }} color="amber.700" fontSize="xl" bold>
                          {item.pronunciation}
                        </Text>
                      </VStack>
                      <VStack alignSelf="center">
                        <Text color="coolGray.400" _dark={{
                          color: "warmGray.200"
                        }}>
                          {item.type}
                        </Text>
                      </VStack>

                      <VStack>
                        <Button onPress={() => this.pronunciationDetails(true, item.id)} borderRadius={20} flexDirection="column" alignSelf="center" backgroundColor="warning.300" height={10} width="100%" ><Icon size="lg" color="white" icon as={Ionicons} name="reader" />
                        </Button>
                      </VStack>
                    </HStack>
                  </Box>} keyExtractor={item => item.id} /></Animation.View>
              </Box>
            </Center>

            <Box>
              <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                <Modal.Content w="500px">
                  <Modal.CloseButton />
                  <Modal.Header fontWeight="50">Pronunciation details</Modal.Header>
                  <Modal.Body>
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
                          <Text textAlign="justify" fontSize={{ base: "md", md: "lg", lg: "xl" }} _ fontWeight="400">
                            {this.state.description}
                          </Text>
                          {/* <Link pl={250} _text={{
                            color: "gray.500",
                            fontSize: "md",
                          }} onPress={() => this.setTranslate()}>
                            Translate
                          </Link> */}
                        </Stack>
                      </Box>
                    </Box>

                  </Modal.Body>
                </Modal.Content>
              </Modal>
            </Box>

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


export default Pronunciation;