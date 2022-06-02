import React, { Component } from 'react';
import { Box, HStack, Text, Center, Heading, VStack, FormControl, Input, Link, Button } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/newloginbackground.png" };
import { connect } from 'react-redux';
import { loginAction, loginFailed } from '../redux/actions/userAction';
import axios from 'axios';
import { baseUrl } from '../shared/herokuURL';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  login() {
        axios
            .post(baseUrl+'user',
                {
                    'Email': this.state.email,
                    'Pass': this.state.password,                                
                },
                {
                  headers:
                  {
                    'Content-Type': 'application/json',
                  }
                }
            )          
            .then((response) => {
                this.props.loginA(this.state.email, this.state.password),
                console.log("Da dang nhap thanh cong vs "+ JSON.stringify(response.data))
                this.props.navigation.navigate('Tab')
            })
            .catch((err) => console.log(err))
  }

RegisterScreen()
{
  this.props.navigation.navigate('Register')
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
                Sign in to continue!
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Email ID</FormControl.Label>
                  <Input backgroundColor={"white"} placeholder="Enter your email" onValueChange={(value) => this.setState({ email: value })}/>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input backgroundColor={"white"} type="password" placeholder="Enter your password"  onValueChange={(value) => this.setState({ password: value })}/>
                </FormControl>
                <Button mt="2" colorScheme="pink" onPress={() => this.login()}>
                  Sign in
                </Button>
                <HStack mt="3" justifyContent="center">
                  <Text fontSize="sm" color="coolGray.600" _dark={{
                    color: "warmGray.200"
                  }}>
                    I'm a new user.{""}
                  </Text>
                 
                  <Link _text={{
                    color: "info.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }} onPress={() => this.RegisterScreen()} >
                    Sign Up
                  </Link>
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

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    loginA: (email, password) => dispatch(loginAction(email, password))

});


export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)