import React, { Component, useEffect } from 'react';
import { Heading, FlatList, Modal, Box, HStack, Text, Link, Icon, Center, Image, Stack, VStack, Badge, Button, AspectRatio, ScrollView } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowquiz.png" };
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { getDatabase, ref, child, onValue, get } from 'firebase/database';
import { Audio } from 'expo-av';

class VocabularyTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vocab: [],
      listWords: [],
      wordId: 0,
      image:'',
      meaning:'',
      mp3: '',
      name: '',
      phonetic: '',
      showModal: false,
    }
  }


  pronunciationPlay = async () => {
    console.log(this.state.mp3)
    const { sound } = await Audio.Sound.createAsync(
      { uri: this.state.mp3 }, { shouldPlay: false });
    await sound.playAsync();
  }

  componentDidMount() {

    //Get Vocabulary Content
    SecureStore.getItemAsync('vocabularyId').then(data => {
      let vocab = JSON.parse(data)
      const id = vocab.id;

      const dbRef = ref(getDatabase());
      get(child(dbRef, 'vocabulary/' + id)).then((snapshot) => {
        const vocabData = snapshot.val();
        // console.log(vocabData);
        this.setState({ vocab: vocabData })
      })

      get(child(dbRef, 'vocabulary/' + id + '/words')).then((snapshot) => {
        // const words = snapshot.val();
        var items = [];
        snapshot.forEach((child) => {
          items.push({
            wId: child.val().wId,
            name: child.val().name,
            phonetic: child.val().phonetic
          })
        });
        this.setState({ listWords: items })
        // const getWords = words.words;
        console.log(this.state.listWords);
        // this.setState({ vocab: vocabData })
      })

    })
  }

  vocabularyDetails(modalVisible,wordId)
  {

    const dbRef = ref(getDatabase());
    onValue(child(dbRef, 'vocabulary/' + this.state.vocab.id + '/words/'+ wordId), (snapshot) => {
      const value = snapshot.val();
      // console.log(value);
      this.setState({
        wordId: value.wId,
        image: "https://angrycatblnt.herokuapp.com/vocabulary/"+value.image,
        name: value.name,
        phonetic: value.phonetic,
        mp3: value.mp3,
        meaning: value.meaning,
      });
    });
    console.log(this.state.name)
    if(this.state.image == "" || this.state.image == null)
    {
      this.setState({image: "https://www.mdsoft.com.vn/images/noimage.png"})
    }
    this.setState({showModal: modalVisible})
  }
  
vocabularyQuiz()
{
  this.props.navigation.navigate("TopicQuiz");
}

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Center flex={1} >
            <VStack mt={3}>
              <Badge // bg="red.400"
                colorScheme="success"  rounded="full" mb={-5} mr={-9} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                  fontSize: 12
                }}>
                {this.state.vocab.level}
              </Badge>
              <Heading mx={{
                base: "auto",
                md: 0
              }} p="2" color="amber.800">
              {this.state.vocab.type}
                </Heading>           
            </VStack>
            <VStack mt={1}  mb={3}> 
            <Button onPress={()=>this.vocabularyQuiz()} borderRadius={20} color="white" backgroundColor="#cf8193">
              Attempt Quiz ⧁
              </Button>                 
            </VStack>
            
            <Center flex={1} >
              <Box backgroundColor="white" pt={1} pb={2} mt={3}  mb={3} height="100%" width="380" >
                <FlatList numColumns={1} data={this.state.listWords} renderItem={({
                  item
                }) => <Box borderBottomWidth="1"  _dark={{
                  borderColor: "muted.50"
                }} borderColor="coolGray.200" py="7" pr="4" pl="4">
                    <HStack pl={2} pr={2} space={13} justifyContent="space-between" >   
                    <VStack alignSelf="center">                   
                      <Text _dark={{
                        color: "warmGray.50"
                      }} color="amber.700" fontSize="md" bold>
                        {item.name}
                      </Text>
                      </VStack>
                      <VStack alignSelf="center"> 
                      <Text color="coolGray.400" _dark={{
                        color: "warmGray.200"
                      }}>
                        {item.phonetic}
                      </Text>
                      </VStack>

                      <VStack>  
                        <Button onPress={() => this.vocabularyDetails(true,item.wId)} borderRadius={20} flexDirection="column" alignSelf="center" backgroundColor="warning.300" height={10} width="100%" ><Icon size="lg" color="white" icon as={Ionicons} name="reader"/>
                        </Button>
                        </VStack>
                    </HStack>                 
                  </Box>} keyExtractor={item => item.wId} />
              </Box>
            </Center>
            

            <Box>
              <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                <Modal.Content maxWidth="700px">
                  <Modal.CloseButton />
                  <Modal.Header fontWeight="50">Word details</Modal.Header>
                  <Modal.Body>                    
             
                  <Box alignItems="center">
                <Box width="100%" height={350} rounded="xl" overflow="hidden" borderColor="#cf8193" borderWidth="1" _dark={{
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
                      <Heading textTransform="uppercase" color="#cf8193" textAlign="center" size="xs" ml="-1">
                        {this.state.name}
                      </Heading>
                      <AspectRatio w="100%" ratio={16 / 9}>
                      <Image source={{
                        uri: this.state.image
                      }} alt="image" />
                    </AspectRatio>
                      <Text textAlign="center" fontSize="lg" _light={{
                        color: "lime.700"
                      }} _dark={{
                        color: "violet.400"
                      }} fontWeight="500" ml="-0.5" mt="-1">                       
                        {this.state.meaning}
                      </Text>
                    </Stack>
                    <Heading textAlign="center" size="md" ml="-1">
                      {this.state.phonetic}
                    </Heading>
                   
                    <Button backgroundColor="#cf8193" alignSelf="center" borderRadius={100} width={20} onPress={() => this.pronunciationPlay()} ><Icon size="2xl" color="white" icon as={MaterialIcons} name="play-arrow" /></Button>
                   
                   
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


export default VocabularyTopic;