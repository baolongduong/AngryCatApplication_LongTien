import React, { Component, useState, useEffect, useContext } from 'react';
import { Image, StatusBar, Box, HStack, Text, Avatar,Modal, Icon, Center, Heading, FormControl, Link, Button, AspectRatio, ScrollView, VStack, border, Input } from 'native-base';
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
    }
    this.state = {
      userData: [],
    }
   
  }



// returnModal(value)
// {
//   console.log(value);
//   return <>
//   <Center>
//     <Text>hell</Text>
//   <Modal isOpen={() => this.setState({showModal:value})} onClose={() => this.setState({setShowModal:false})}>
//     <Modal.Content maxWidth="400px">
//       <Modal.CloseButton />
//       <Modal.Header>Contact Us</Modal.Header>
//       <Modal.Body>
//         <FormControl>
//           <FormControl.Label>Name</FormControl.Label>
//           <Input />
//         </FormControl>
//         <FormControl mt="3">
//           <FormControl.Label>Email</FormControl.Label>
//           <Input />
//         </FormControl>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button.Group space={2}>
//           <Button variant="ghost" colorScheme="blueGray" onPress={() => this.setState({setShowModal:false})}>
//             Cancel
//           </Button>
//           <Button onPress={() => this.setState({setShowModal:false})}>
//             Save
//           </Button>
//         </Button.Group>
//       </Modal.Footer>
//     </Modal.Content>
//   </Modal>
// </Center>
// </>;
// }

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

  render() {

    // SecureStore.getItemAsync('userinfo').then(data=>{
    //   let UserInfo = JSON.parse(data);
    //   if(UserInfo)
    //   {
    //     const {Username, Password} = UserInfo;
    //     this.setState({ Username, Password });
    //   }    
    //   })
      

    return (
      
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Box style={styles.container}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
            <Center>
            <AspectRatio w="100%" ratio={16 / 9}>
                      <Image mt={5} source={{
                        uri: "https://angrycatblnt.herokuapp.com/images/welcome.png"
                      }} alt="image" />
                    </AspectRatio>
              <Button backgroundColor="warmGray.300" borderRadius={50}><FontAwesome5 name="camera" size={24} color="black" /></Button>
              <HStack  justifyContent="center" width="100%"  borderRadius="30" borderColor="black" space="100">
                  <VStack height="70" p="1" space={4} flex="0.75"  backgroundColor="white" margin={2} borderRadius="10%"  >
                    <HStack space="100" borderBottomWidth={2} borderColor="coolGray.200" paddingTop={1} >
                        <Text textAlign="center" fontWeight={"900"} fontSize="15" >Score Vocabulary</Text>
                        <Text>{this.state.userData.VScore}</Text>
                    </HStack>
                    <HStack space="110"  >
                        <Text textAlign="center" fontWeight={"900"} fontSize="15">Score Grammar</Text>
                        <Text>{this.state.userData.GScore}</Text>
                    </HStack>
                  </VStack>   
              </HStack>  
            </Center>           
          </Box>
          
          <Box style={styles.container}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}> 
            <HStack  justifyContent="space-around" width="100%" borderRadius="30" borderColor="black" space="200" >
                    <VStack height="300" p="1" space={4} flex="0.85" backgroundColor="white" borderColor="black" marginTop="7" borderRadius="10%">
                    <Heading  textAlign="center">Information</Heading>
                    <ScrollView >
                    <FormControl>
                      <FormControl.Label style={{fontSize:700, fontWeight:500}} >Email: </FormControl.Label>
                         <Input fontSize="15" placeholder={this.state.userData.Email}  isReadOnly = "true" />
                     </FormControl>
                     <FormControl>
                      <FormControl.Label>UserName: </FormControl.Label>
                         <Input fontSize="15" placeholder={this.state.userData.Username} isReadOnly = "true">
                          </Input>
                     </FormControl>
                     <FormControl>
                      <FormControl.Label>Password: </FormControl.Label>
                         <Input fontSize="15" placeholder={this.state.userData.Password} isReadOnly = "true"/>
                     </FormControl>
                     <FormControl>
                      <FormControl.Label>Name: </FormControl.Label>
                         <Input fontSize="15" placeholder={this.state.userData.Name} isReadOnly = "true"/>
                     </FormControl>
                    <Button mt="3" onPress={()=>this.setState({showModal:true})} textAlign="center" borderRadius="10%" background="pink.400"> Edit</Button>
                    </ScrollView>
                  </VStack>   
              </HStack>  
        
<Box>
           <Modal isOpen={this.state.showModal} onClose={() => this.setState({showModal:false})}>
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
          <Button variant="ghost" colorScheme="pink" onPress={() => this.setState({showModal:false})}>
            Cancel
          </Button>
          <Button backgroundColor="pink.400" onPress={() => this.setState({showModal:false})}>
            Save
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal> 
  </Box>
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