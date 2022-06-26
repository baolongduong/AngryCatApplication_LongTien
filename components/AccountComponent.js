import React, { Component, useState, useEffect, useContext } from 'react';
import { Image, StatusBar, Box, HStack, Text, Avatar, Modal, Icon, Center, Heading, FormControl, Link, Button, AspectRatio, ScrollView, VStack, border, Input } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/colorbackground.png" };
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
    }
  }


  componentDidMount() {

    SecureStore.getItemAsync('userinfo').then(data => {
      let User = JSON.parse(data)
      const DataUser = User.Username;
      console.log(DataUser);
      const dbRef = ref(getDatabase());
      get(child(dbRef, 'user/info/' + DataUser)).then((snapshot) => {
        const UserData = snapshot.val();
        console.log(UserData);
        this.setState({ userData: UserData })
      })
    })
  }

  render() {
    return (

      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Box safeArea p="2" py="6"  mb={20} style={styles.container}>
            <Center >
              <Avatar mt={7} mb={1}  size="200px" width="200px" source={{
                  uri: "https://images.theconversation.com/files/443350/original/file-20220131-15-1ndq1m6.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C3354%2C2464&q=45&auto=format&w=926&fit=clip"
                  }} />
              <Button backgroundColor="warmGray.300" borderRadius={50}><FontAwesome5 name="camera" size={24} color="black" /></Button>
              <HStack justifyContent="center" width="100%" borderRadius={20} borderColor="black" space="100">
                <VStack height="70" p="1" space={4} flex="0.75" backgroundColor="white" margin={2} borderRadius={30}  >
                  <HStack pl={3} space="100" borderBottomWidth={2} borderColor="coolGray.200" paddingTop={1} >
                    <Text textAlign="center" fontWeight={"900"} fontSize="15" >Score Vocabulary</Text>
                    <Text>{this.state.userData.VScore}</Text>
                  </HStack>
                  <HStack pl={3} space="100"  >
                    <Text textAlign="center" fontWeight={"900"} fontSize="15">Score Grammar</Text>
                    <Text>{this.state.userData.GScore}</Text>
                  </HStack>
                </VStack>
              </HStack>
     

            <HStack  justifyContent="space-around" width="100%" borderRadius={30} borderColor="black" space="200" >
              <VStack height="300" p="1" space={4} flex="0.85" backgroundColor="white" borderColor="black" marginTop="1" borderRadius={30}>
                <Heading textAlign="center">Information</Heading>
                <ScrollView >
                  <FormControl>
                    <FormControl.Label style={{ fontSize: 700, fontWeight: 500 }} >Email: </FormControl.Label>
                    <Input fontSize="15" placeholder={this.state.userData.Email} isReadOnly="true" />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>UserName: </FormControl.Label>
                    <Input fontSize="15" placeholder={this.state.userData.Username} isReadOnly="true">
                    </Input>
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Password: </FormControl.Label>
                    <Input fontSize="15" placeholder={this.state.userData.Password} isReadOnly="true" />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Name: </FormControl.Label>
                    <Input fontSize="15" placeholder={this.state.userData.Name} isReadOnly="true" />
                  </FormControl>
                  <Button mt="3" onPress={() => this.setState({ showModal: true })} textAlign="center" borderRadius={30} background="pink.400"> Edit</Button>
                </ScrollView>
              </VStack>
            </HStack>
         
            <Box>
              <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                <Modal.Content maxWidth="700px">
                  <Modal.CloseButton />
                  <Modal.Header fontWeight="50">Edit:</Modal.Header>
                  <Modal.Body>
                    <FormControl>
                      <FormControl.Label>UserName:</FormControl.Label>
                      <Input />
                    </FormControl>
                    <FormControl mt="3">
                      <FormControl.Label>Email:</FormControl.Label>
                      <Input />
                    </FormControl>
                    <FormControl mt="3">
                      <FormControl.Label>Password:</FormControl.Label>
                      <Input />
                    </FormControl>
                    <FormControl mt="3">
                      <FormControl.Label>Name:</FormControl.Label>
                      <Input />
                    </FormControl>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button variant="ghost" colorScheme="pink" onPress={() => this.setState({ showModal: false })}>
                        Cancel
                      </Button>
                      <Button backgroundColor="pink" onPress={() => this.setState({ showModal: false })}>
                        Save
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </Box>

            </Center>
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