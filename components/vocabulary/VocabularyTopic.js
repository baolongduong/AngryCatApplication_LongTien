import React, { Component, useEffect } from 'react';
import { Image, FlatList, Avatar, Box, HStack, Text, IconButton, Icon, Center, Spacer, Stack, VStack, Badge, Button, AspectRatio, ScrollView } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/colorbackground.png" };
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { getDatabase, ref, child, onValue, get } from 'firebase/database';


class VocabularyTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vocab: [],
      listWords: []
    }
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

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Center flex={1} >
            {/* <Text _dark={{
              color: "warmGray.50"
            }} fontSize={18} color="#cf8193" bold>
              Vocabulary Lessons
            </Text> */}
            <VStack mt={3}>
              <Badge // bg="red.400"
                colorScheme="success" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                  fontSize: 12
                }}>
                {this.state.vocab.level}
              </Badge>
              <Button mx={{
                base: "auto",
                md: 0
              }} p="2" bg="pink.300" _text={{
                fontSize: 14
              }}>
                {this.state.vocab.type}
              </Button>
            </VStack>

            <Center flex={1} >
              <Box backgroundColor="white" pt={1} pb={2} mt={3}  mb={3} width={350} borderRadius={50}>
                <FlatList numColumns={1} data={this.state.listWords} renderItem={({
                  item
                }) => <Box borderBottomWidth="1" _dark={{
                  borderColor: "muted.50"
                }} borderColor="coolGray.200" py="7" pr="3" pl="3">
                    <HStack pl={2} pr={2} space={9} justifyContent="space-between" >   
                    <VStack>                   
                      <Text _dark={{
                        color: "warmGray.50"
                      }} color="lime.500" bold>
                        {item.name}
                      </Text>
                      </VStack>
                      <VStack> 
                      <Text color="coolGray.600" _dark={{
                        color: "warmGray.200"
                      }}>
                        {item.phonetic}
                      </Text>
                      </VStack>

                      <VStack>  
                        <Button borderRadius={20} flexDirection="column" alignSelf="stretch" backgroundColor="pink.300" height={7} width="100%" ><Icon size="lg" color="white" icon as={Ionicons} name="book-outline"/>
                        </Button>
                        </VStack>

                    </HStack>
                  
                  </Box>} keyExtractor={item => item.wId} />
              </Box>
            </Center>
            <VStack mt={1}  mb={3}> 
            <Button borderRadius={20} color="white" backgroundColor="danger.400">
              Attempt Quiz &gt;
              </Button>          
        
            </VStack>
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