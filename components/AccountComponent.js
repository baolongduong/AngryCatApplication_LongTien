import React, { Component, useState, useEffect, useContext } from 'react';
import { Image, StatusBar, Box, HStack, Text, Avatar, Modal, Badge, Center, Heading, FormControl, Link, Button, AspectRatio, ScrollView, VStack, border, Input } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowquiz.png" };
import * as SecureStore from 'expo-secure-store'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { getDatabase, ref, child, push, set, get } from 'firebase/database';



class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      userData: [],
      Email: "",
      UserName: "",
      Password: "",
      Name: "",
    }


  }

  componentDidMount() {

    //Get Vocabulary Content
    SecureStore.getItemAsync('userinfo').then(data => {
      let User = JSON.parse(data)
      const DataUser = User.Username;
      console.log(DataUser);
      const dbRef = ref(getDatabase());
      get(child(dbRef, 'user/info/' + DataUser)).then((snapshot) => {
        const UserData = snapshot.val();
        //Get Vocabulary information
        console.log(UserData);
        this.setState({ userData: UserData })
        //Get Vocabulary Words
        // const getWords = vocabData.words;
        // console.log(vocabData.words)
        // this.setState({ listWords: getWords })
        // console.log(this.state.listWords)
      })
    })
  }

  updateDataBase(Email, Password, Name, Value) {
    const dbRef = ref(getDatabase());
    set(child(dbRef, 'user/info/' + this.state.userData.Username), {
      Username: this.state.userData.Username,
      Email: Email,
      Name: Name,
      Password: Password,
      VScore: this.state.userData.VScore,
      GScore: this.state.userData.GScore,
    });
    alert('Edit successfully !!!');
    this.setState({ showModal: Value })
      .catch((error) => alert('Edit unsuccessfully ', error));
  }


  render() {

    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Center>
          <Heading mb={1} textAlign="center">Information</Heading>
            <HStack justifyContent="center">  
              <VStack>   
              <Badge // bg="red.400"
                colorScheme="success" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                  fontSize: 12
                }}>
                LV1
              </Badge>
              <Avatar ml={3} size="100px" source={{
                    uri: "https://i.pinimg.com/originals/80/90/01/8090016ff061aa6baa8843a0201c58e2.jpg"
                  }} />        
                <HStack ml={3} mt={3} alignSelf="center" >
                  <Button backgroundColor="white" borderRadius={100}><FontAwesome5 name="camera" size={15} color="black" /></Button>
                  <Button ml={1} backgroundColor="white" borderRadius={100}><FontAwesome5 name="camera" size={15} color="black" /></Button>
                </HStack>
              </VStack>

              <VStack pl={3} mt={3} ml={3} mr={3} height="135" p="2" flex="1" backgroundColor="white" borderRadius="10"  >
                <HStack  borderBottomWidth={2} borderColor="pink.400" paddingTop={1} >              
                  <Text color="pink.600" fontWeight={"900"} fontSize="20" >{this.state.userData.Username}</Text>
                </HStack>
                <HStack borderBottomWidth={1} borderColor="coolGray.200" paddingTop={1} >
                  <Text fontWeight={"900"} fontSize="15" >Vocabulary: </Text>
                  <Text>{this.state.userData.VScore}</Text>
                </HStack>
                <HStack paddingTop={1} >
                  <Text fontWeight={"900"} fontSize="15">Grammar: </Text>
                  <Text>{this.state.userData.GScore}</Text>
                </HStack>
              </VStack>                    
            </HStack>
          </Center>

          <Center>
            <HStack justifyContent="center" width={400} height={400} borderRadius="30" borderColor="black" >
              <VStack p="2" space={4} flex="0.85" backgroundColor="white" borderColor="black" marginTop="2" borderRadius="10">
                <ScrollView>
                <FormControl>
                  <FormControl.Label style={{ fontSize: 700, fontWeight: 500 }} >Email: </FormControl.Label>
                  <Input isDisabled="true" fontSize="15" value={this.state.userData.Email} isReadOnly="true" />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Username: </FormControl.Label>
                  <Input isDisabled="true" fontSize="15" value={this.state.userData.Username} isReadOnly="true">
                  </Input>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password: </FormControl.Label>
                  <Input isDisabled="true" type="password" fontSize="15" value={this.state.userData.Password} isReadOnly="true" />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Name: </FormControl.Label>
                  <Input isDisabled="true" fontSize="15" value={this.state.userData.Name} isReadOnly="true" />
                </FormControl>
                <Box alignSelf="center">
                  <Button width={100} mt="3" mb="3" onPress={() => this.setState({ showModal: true })} textAlign="center" borderRadius="100" background="pink.400"> Edit</Button>
                </Box>
                </ScrollView>
                
              </VStack>
            </HStack>
          </Center>



          <Box >
            <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
              <Modal.Content maxWidth="700px">
                <Modal.CloseButton />
                <Modal.Header fontWeight="50">Edit:</Modal.Header>
                <Modal.Body>
                  <FormControl>
                    <FormControl.Label>UserName:</FormControl.Label>
                    <Input value={this.state.userData.Username} Text="mo" />
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>Email:</FormControl.Label>
                    <Input value={this.state.userData.Email} onChangeText={(text) => this.setState({ Email: text })} />
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>Password:</FormControl.Label>
                    <Input value={this.state.userData.Password} onChangeText={(text) => this.setState({ Password: text })} />
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>Name:</FormControl.Label>
                    <Input value={this.state.userData.Name} onChangeText={(text) => this.setState({ Name: text })} />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="pink" onPress={() => this.setState({ showModal: false })}>
                      Cancel
                    </Button>
                    <Button backgroundColor="pink.400" onPress={() => this.updateDataBase(this.state.Email,
                      this.state.Password,
                      this.state.Name, false)}>
                      Save
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Box>

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


export default Account;