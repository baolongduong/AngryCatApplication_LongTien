import React, { Component } from 'react';
import { getDatabase, ref, child, push, set, get } from 'firebase/database';
import { Image, StatusBar, Box, HStack, Text, Icon, Center, Heading, VStack, FormControl, Input,Button } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
const image = { uri: "https://angrycatblnt.herokuapp.com/images/AngryCatRegister_Fixed.png" };

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Email: '',
      Name: '',
      Password: '',
      VScore: 0,
      GScore: 0
    }
  }

  handleRegister() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'user/info/' + this.state.Username)).then((snapshot) => {
      if (snapshot.exists()) {
        alert('Angry Cat have exists username ');
      }
      else {
        set(child(dbRef, 'user/info/' + this.state.Username), {
          Username: this.state.Username,
          Email: this.state.Email,
          Name: this.state.Name,
          Password: this.state.Password,
          VScore: this.state.VScore,
          GScore: this.state.GScore
        }); // custom key
        alert('Ok baby!');
        this.props.navigation.navigate('Login')
      }
    }).catch((error) => alert('Could not get data from firebase', error));
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Center>
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading size="md" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
              }}>
                Welcome to Angry Cat
              </Heading>
              <Heading mt="1" _dark={{
                color: "warmGray.200"
              }} color="coolGray.600" fontWeight="medium" size="xs">
                Create your account!
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Username</FormControl.Label>         
                
                 <Input backgroundColor={"white"} placeholder="Enter your username" onChangeText={(text) => this.setState({ Username: text })} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input backgroundColor={"white"} placeholder="Enter your email" onChangeText={(text) => this.setState({ Email: text })} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input backgroundColor={"white"} placeholder="Enter your name" onChangeText={(text) => this.setState({ Name: text })} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input backgroundColor={"white"} type="password" placeholder="Enter your password" onChangeText={(text) => this.setState({ Password: text })} />
                </FormControl>
                <Button mt="4" colorScheme="pink" onPress={() => this.handleRegister()}>
                  Sign up
                </Button>
              </VStack>
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


export default Register;