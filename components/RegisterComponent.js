import React, { Component } from 'react';
import {Image,StatusBar,Box,HStack,Text,IconButton,Icon,Center,Heading,VStack,FormControl,Input,Link,Button} from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/newloginbackground.png" };

class Register extends Component {
  render() {
    return (
    <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1, justifyContent :"center"}}>
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
            <FormControl.Label>Email ID</FormControl.Label>
            <Input backgroundColor={"white"} placeholder="Enter your email" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input backgroundColor={"white"} type="password" placeholder="Enter your password" />
            {/* <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link> */}
          </FormControl>
          <Button mt="2" colorScheme="pink">
            Sign up
          </Button>
          <HStack mt="3" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              Be careful with your password !!!
            </Text>          
          </HStack>
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