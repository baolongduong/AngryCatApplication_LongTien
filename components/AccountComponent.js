import React, { Component, useState, useEffect, useContext } from 'react';
import { Image,FlatList, StatusBar, Box, HStack, Text, Avatar, Modal, Badge, Center, Heading, FormControl, Link, Button, AspectRatio, ScrollView, VStack, border, Input } from 'native-base';
import { ImageBackground, StyleSheet, View} from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowquiz.png" };
import * as SecureStore from 'expo-secure-store'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { getDatabase, ref, child, push, set, get } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from './LoadingComponent';

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
      Image: "https://i.pinimg.com/originals/80/90/01/8090016ff061aa6baa8843a0201c58e2.jpg",
      alertStatus: false,
      warningStatus: '',
      avatar: [],
      showModalAvatar: false,
      level: 0,
      logoutModal: false
    }
  }

  componentDidMount() {

    //Get Vocabulary Content
    SecureStore.getItemAsync('userinfo').then(data => {
      let User = JSON.parse(data)
      const DataUser = User.Username;
      // console.log(DataUser);
      const dbRef = ref(getDatabase());
      get(child(dbRef, 'user/info/' + DataUser)).then((snapshot) => {
        const UserData = snapshot.val();
        this.setState({ userData: UserData })
      })
    })
  }

  uploadAvatar(image,Value)
  {
    const dbRef = ref(getDatabase());
    set(child(dbRef, 'user/info/' + this.state.userData.Username), {
      Username: this.state.userData.Username,
      Email:this.state.userData.Email,
      Name: this.state.userData.Name,
      Password: this.state.userData.Password,
      VScore: this.state.userData.VScore,
      GScore: this.state.userData.GScore,
      Image: image,
    });
    alert('Edit successfully !!!');
    this.setState({ showModalAvatar: Value})
      // .catch((error) => alert('Edit unsuccessfully ', error));
  }

  logout() {
    SecureStore.deleteItemAsync('userinfo').catch((error) => alert('Could not delete user info', error));
    this.props.navigation.navigate('Login');
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.UserData !== this.state.userData) {
      this.componentDidMount();
    }
  }

  updateDataBase(Email, Password, Name, Value) {
    if(Email == null || Email == "")
    {
      Email = this.state.userData.Email;
    }
    else
    {
      Email = Email;
    }
    if(Password == null || Password == "")
    {
      Password = this.state.userData.Password;
    }
    else
    {
      Password = Password;
    }
    if(Name == null || Name == "")
    {
      Name = this.state.userData.Name;
    }
    else
    {
      Name = Name;
    }
    const dbRef = ref(getDatabase());
    set(child(dbRef, 'user/info/' + this.state.userData.Username), {
      Username: this.state.userData.Username,
      Email: Email,
      Name: Name,
      Password: Password,
      VScore: this.state.userData.VScore,
      GScore: this.state.userData.GScore,
      Image: this.state.userData.Image,
    });
    this.setState({ showModal: Value });
    alert('Edit successfully !!!');
  }

  openAvatar()
  {
    
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'user/avatar')).then((snapshot) => {
      // const words = snapshot.val();
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          Image: child.val().Image,
        })
      });
      this.setState({ avatar: items })
      // console.log(this.state.listUser);
    })
    this.setState({showModalAvatar: true})
  }

  render() {
    if(this.props.isLoading)
    {
      return (<Loading />);
    }
    else
    {
      return (
        <View style={styles.container}>
          <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
            <Center>
  
              
              {/* <Heading mb={1}  textAlign="center" color="amber.800">Information</Heading> */}
              <HStack justifyContent="center">
                <VStack>
                  <Badge // bg="red.400"
                    colorScheme="success" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                      fontSize: 12
                    }}>
                    LV1
                  </Badge>
                  <Avatar  borderWidth={2} borderColor="pink.400" ml={3} size="100px" source={{
                    uri: this.state.userData.Image
                  }} />
                  <HStack ml={3} mt={2} alignSelf="center" >
                    <Button onPress={() => this.openAvatar()} backgroundColor="white" borderColor="#cf8193" borderWidth={1} borderRadius={100}><FontAwesome5 name="camera" size={15} color="#cf8193" /></Button>
                    <Button onPress={() => this.setState({logoutModal:true})} ml={1} borderColor="#cf8193" borderWidth={1} backgroundColor="white" borderRadius={100}><FontAwesome5 name="sign-out-alt" size={15} color="#cf8193" /></Button>
                  </HStack>
                </VStack>
  
                <VStack pl={3} mt={3} ml={3} mr={3} height="135" p="2" flex="1" backgroundColor="white" borderRadius="10"  >
                  <HStack borderBottomWidth={2} borderColor="pink.400" paddingTop={1} >
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
  
            <Center >
              <HStack justifyContent="center" width={400} height={400} borderRadius="30" borderColor="black" >
                <VStack p="2" space={4} flex="0.85" backgroundColor="white" borderColor="black" marginTop="2" borderRadius="10">
                  <View>
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
                  </View>
                </VStack>
              </HStack>
            </Center>
  
  
            <Box >
              <Modal isOpen={this.state.logoutModal} onClose={() => this.setState({ logoutModal: false })}>
                <Modal.Content maxWidth="800px">
                  <Modal.CloseButton />
                  <Modal.Header fontWeight="50">Are you want to logout?</Modal.Header>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button variant="ghost" colorScheme="pink" onPress={() => this.setState({ logoutModal: false })}>
                        Cancel
                      </Button>
                      <Button backgroundColor="pink.400" onPress={() => this.logout()}>
                        Yes
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </Box>
  
            <Box >
              <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                <Modal.Content maxWidth="800px">
                  <Modal.CloseButton />
                  <Modal.Header fontWeight="50">Edit information:</Modal.Header>
                  <Modal.Body>
                    <FormControl>
                      <FormControl.Label>UserName:</FormControl.Label>
                      <Input isDisabled="true" value={this.state.userData.Username} Text="mo" />
                    </FormControl>
                    <FormControl mt="3">
                      <FormControl.Label>Email:</FormControl.Label>
                      <Input placeholder={this.state.userData.Email}  onChangeText={(text) => this.setState({ Email: text })} />
                    </FormControl>
                    <FormControl mt="3">
                      <FormControl.Label>Password:</FormControl.Label>
                      <Input placeholder={this.state.userData.Password} onChangeText={(text) => this.setState({ Password: text })} />
                    </FormControl>
                    <FormControl mt="3">
                      <FormControl.Label>Name:</FormControl.Label>
                      <Input placeholder={this.state.userData.Name} onChangeText={(text) => this.setState({ Name: text })} />
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
  
            <Box >
              <Modal isOpen={this.state.showModalAvatar} onClose={() => this.setState({ showModalAvatar: false })}>
                <Modal.Content width="800px">
                  <Modal.CloseButton />
                  <Modal.Header fontWeight="50">Avatar:</Modal.Header>
                  <Modal.Body>
                  <ScrollView nestedScrollEnabled={true}>   
                  <View>
                  <ScrollView horizontal={true}>   
                  <Box borderRadius={10}>   
                <FlatList numColumns={3} data={this.state.avatar}          
                renderItem={({
                  item
                }) =>
                <TouchableOpacity >               
                  <Box borderRadius={20} justifyContent="space-between" borderColor="coolGray.300" borderRightWidth="1" borderBottomWidth={1} mt={4} mb={1} alignItems="center" backgroundColor="white" height={200} width={100} margin={2}  _dark={{
                    borderColor: "muted.50"
                  }}  py="5"  >              
                  <AspectRatio w="100%" ratio={4 / 4}>
                    <Image w="100%" source={{
                      uri: item.Image
                    }} alt="image" />
                  </AspectRatio>
                  <Button backgroundColor="pink.300" onPress={() => this.uploadAvatar((item.Image),false)}>Select</Button>
                  </Box>
                  </TouchableOpacity>
                }/> 
             
              </Box>
              </ScrollView>
              </View>
              </ScrollView>  
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button variant="ghost" colorScheme="pink" onPress={() => this.setState({ showModalAvatar: false })}>
                        Cancel
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