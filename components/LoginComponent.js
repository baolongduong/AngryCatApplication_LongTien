import { getDatabase, ref, child, push, set, get } from 'firebase/database';
import React, { Component } from 'react';
import { Alert, Box, HStack, Text, Center, Heading, Hidden, Icon, VStack, FormControl, Input, Link, Button, IconButton, CloseIcon, Collapse } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
import * as SecureStore from 'expo-secure-store'
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowBackground.png" };

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
            errorMessage: '',
            alertStatus: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo').then(data => {
            let UserInfo = JSON.parse(data);
            if (UserInfo) {
                this.props.navigation.navigate('Tab');
            }
            else {
                this.props.navigation.navigate('Login');
            }
        })
    }

    handleLogin() {
        if (this.state.Username == "" || this.state.Username == null) {
            this.setState({ alertStatus: true })
            this.setState({ errorMessage: 'Username can`t left blank' })
        }
        else if (this.state.Username.length < 8 || this.state.Username.length > 20) {
            this.setState({ alertStatus: true })
            this.setState({ errorMessage: 'Username must be > 8 and < 20 characters' })
        }
        else if (this.state.Password == "" || this.state.Password == null) {
            this.setState({ alertStatus: true })
            this.setState({ errorMessage: 'Password can`t left blank' })
        }
        else if (this.state.Password.length < 8) {
            this.setState({ alertStatus: true })
            this.setState({ errorMessage: 'Password must be > 8 characters' })
        }
        else {
            const dbRef = ref(getDatabase());
            get(child(dbRef, 'user/info/' + this.state.Username)).then((snapshot) => {
                if (snapshot.exists()) {
                    const account = snapshot.val();
                    if (account.Password === this.state.Password) {
                        console.log(account)
                        SecureStore
                            .setItemAsync('userinfo', JSON.stringify({ Username: this.state.Username, Password: this.state.Password }))
                            .catch((error) => {
                                this.setState({ alertStatus: true })
                                this.setState({ errorMessage: 'Could not save user info', error })
                            });
                        this.props.navigation.navigate('Tab');
                    } else {
                        this.setState({ alertStatus: true })
                        this.setState({ errorMessage: 'Your password is invalid' })
                        SecureStore
                            .deleteItemAsync('userinfo')
                            .catch((error) => {
                                this.setState({ alertStatus: true })
                                this.setState({ errorMessage: 'Could not delete user info', error })
                            });
                    }
                }
                else {
                    this.setState({ alertStatus: true })
                    this.setState({ errorMessage: 'Your username is invalid!' })
                    SecureStore
                        .deleteItemAsync('userinfo')
                        .catch((error) => {
                            this.setState({ alertStatus: true })
                            this.setState({ errorMessage: 'Could not delete user info', error })
                        });
                }
            }).catch((error) => {
                this.setState({ alertStatus: true })
                this.setState({ errorMessage: 'Could not get data from firebase', error })
            });
        }
    }

    RegisterScreen() {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <View style={styles.container}>

                <Collapse mb={2} isOpen={this.state.alertStatus}>
                    <Alert w="100%" maxW="400" status="warning" colorScheme="warning">
                        <VStack space={3} flexShrink={1} w="100%">
                            <HStack flexShrink={1} space={10} alignItems="center" justifyContent="space-between">
                                <HStack flexShrink={1} space={10} alignItems="center">
                                    <Alert.Icon />
                                    <Text alignContent="center" fontSize="md" fontWeight="medium" color="coolGray.800">
                                        Warning Validation
                                    </Text>
                                </HStack>
                                <IconButton onPress={() => this.setState({ alertStatus: false })} variant="unstyled" _focus={{
                                    borderWidth: 0
                                }} icon={<CloseIcon size="3" color="coolGray.600" />} />
                            </HStack>
                            <Text fontSize="sm" fontWeight="light" color="coolGray.800">
                                {this.state.errorMessage}
                            </Text>
                        </VStack>
                    </Alert>
                </Collapse>


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
                            <VStack space={3} mt="4">
                                <FormControl>
                                    <FormControl.Label>Username</FormControl.Label>
                                    <Input InputLeftElement={<Icon size="md" marginLeft={2} color="coolGray.600" icon as={FontAwesome} name="user" />} backgroundColor={"white"} placeholder="Enter your username" onChangeText={(text) => this.setState({ Username: text })} />
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>Password</FormControl.Label>
                                    <Input InputLeftElement={<Icon size="md" marginLeft={2} color="coolGray.600" icon as={FontAwesome} name="lock" />} backgroundColor={"white"} type="password" placeholder="Enter your password" onChangeText={(text) => this.setState({ Password: text })} />
                                </FormControl>
                                <Button mt="2" color="white" backgroundColor="pink.400" onPress={() => this.handleLogin()}>
                                    Sign in
                                </Button>
                                <HStack mt="1" justifyContent="center">
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