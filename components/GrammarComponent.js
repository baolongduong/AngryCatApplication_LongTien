import React, { Component, useEffect } from 'react';
import { Heading, FlatList, Modal, Box, HStack, Text, Link, Icon, Center, Image, Stack, VStack, Badge, Button, AspectRatio, ScrollView } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowquiz.png" };
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { getDatabase, ref, child, onValue, get } from 'firebase/database';
import { Audio } from 'expo-av';

class Grammar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listGrammar: [],
    }
  }

  pronunciationPlay = async () => {
    console.log(this.state.mp3)
    const { sound } = await Audio.Sound.createAsync(
      { uri: this.state.mp3 }, { shouldPlay: false });
    await sound.playAsync();
  }

  componentDidMount() {

      const dbRef = ref(getDatabase());
      get(child(dbRef, 'grammar/')).then((snapshot) => {
        // const words = snapshot.val();
        var items = [];
        snapshot.forEach((child) => {
          items.push({
            GrammarId: child.val().GrammarId,
            TenseName: child.val().TenseName,
          })
        });
        this.setState({ listGrammar: items })
        console.log(this.state.listGrammar);
      })
  }
  

  getGrammarTopicID(id) {
    console.log("Da lay id: " + id);
    SecureStore
      .setItemAsync('grammarId', JSON.stringify({ id: id }))
      .catch((error) => alert('Could not save user info', error));
    this.props.navigation.navigate("GrammarLessons");
  }
  


  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Center flex={1} >
            <VStack mt={3}>
              <Heading mx={{
                base: "auto",
                md: 0
              }} p="2" color="amber.800">
              12 SENTENCES
                </Heading>           
            </VStack>
            <VStack mt={1}  mb={3}> 
            <Text>
              Present, Past and Future
              </Text>                 
            </VStack>
            
            <Center flex={1} >
              <Box backgroundColor="white" pt={1} pb={2} mt={3}  mb={3} height="100%" width="380" >
                <FlatList numColumns={1} data={this.state.listGrammar} renderItem={({
                  item
                }) => <Box borderBottomWidth="1"  _dark={{
                  borderColor: "muted.50"
                }} borderColor="coolGray.200" py="7" pr="4" pl="4">
                    <HStack pl={2} pr={2} space={13} justifyContent="space-between" >   
                    <VStack >                   
                      <Text _dark={{
                        color: "warmGray.50"
                      }} color="amber.700" fontSize="md" bold>
                      <Text   color="amber.600">{item.GrammarId}</Text>  {item.TenseName}
                      </Text>
                      </VStack>
                      <VStack>  
                        <Button onPress={() => this.getGrammarTopicID(item.GrammarId)} borderRadius={20} flexDirection="column" alignSelf="center" backgroundColor="warning.300" height={10} width="100%" ><Icon size="lg" color="white" icon as={Ionicons} name="reader"/>
                        </Button>
                        </VStack>
                    </HStack>                 
                  </Box>} keyExtractor={item => item.GrammarId} />
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


export default Grammar;