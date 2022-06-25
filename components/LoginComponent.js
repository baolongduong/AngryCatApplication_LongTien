import { getDatabase, ref, child, push, set, get } from 'firebase/database';
import React, { Component } from 'react';
import { Box, HStack, Text, Center, Heading, VStack, FormControl, Input, Link, Button } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
import * as SecureStore from 'expo-secure-store'
const image = { uri: "https://angrycatblnt.herokuapp.com/images/newloginbackground.png" };

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
        }
    }
    
    handleLogin() {
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'user/info/' + this.state.Username)).then((snapshot) => {
            if (snapshot.exists()) {
                const account = snapshot.val();
                if (account.Password === this.state.Password) {
                    console.log(account)
                    SecureStore
                    .setItemAsync('userinfo', JSON.stringify({ Username: this.state.Username, Password: this.state.Password }))
                    .catch((error) => alert('Could not save user info', error));
                    alert('Come on baby!');
                    this.props.navigation.navigate('Tab');
                    if (this.state.remember == true) {
                        SecureStore
                            .setItemAsync('userinfo', JSON.stringify({ Username: this.state.Username, Password: this.state.Password }))
                            .catch((error) => alert('Could not save user info', error));
                    }
                } else {
                    alert('Invalid password!');
                    SecureStore
                        .deleteItemAsync('userinfo')
                        .catch((error) => alert('Could not delete user info', error));
                }
            } else {
                alert('Invalid username!');
                SecureStore
                    .deleteItemAsync('userinfo')
                    .catch((error) => alert('Could not delete user info', error));
            }
        }).catch((error) => alert('Could not get data from firebase', error));
    }

    RegisterScreen() {
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
                                    <FormControl.Label>Username</FormControl.Label>
                                    <Input backgroundColor={"white"} placeholder="Enter your username" onChangeText={(text) => this.setState({ Username: text })} />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Password</FormControl.Label>
                                    <Input backgroundColor={"white"} type="password" placeholder="Enter your password" onChangeText={(text) => this.setState({ Password: text })} />
                                </FormControl>
                                <Button mt="2" backgroundColor="pink.400" onPress={() => this.handleLogin()}>
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

export default LoginScreen