import React, { Component } from 'react';
import { getDatabase, ref, child, push, set, get } from 'firebase/database';
import { Image, StatusBar, Box, HStack, Text, Icon,Modal, Center,AspectRatio, Heading, VStack, FormControl, Alert, IconButton, CloseIcon, Input, Button, Collapse } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
const image = { uri: "https://angrycatblnt.herokuapp.com/images/registerBackground.png" };

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Email: '',
      Name: '',
      Password: '',
      VScore: 0,
      GScore: 0,
      Image: "https://i.pinimg.com/originals/80/90/01/8090016ff061aa6baa8843a0201c58e2.jpg",
      errorMessage: '',
      alertStatus: false,
      warningStatus: '',
      showModal: false,
    }
  }
returnToLogin()
{
  this.props.navigation.navigate('Login')
}
  handleRegister() {
    const dbRef = ref(getDatabase());
    if (this.state.Username == "" || this.state.Username == null) {
      this.setState({ alertStatus: true })
      this.setState({ warningStatus: 'warning' })
      this.setState({ errorMessage: 'Username can`t left blank' })
    }
    else if (this.state.Username.length < 8 || this.state.Username.length > 20) {
      this.setState({ alertStatus: true })
      this.setState({ warningStatus: 'warning' })
      this.setState({ errorMessage: 'Username must be > 8 and < 20 characters' })
    }
    else if (this.state.Password == "" || this.state.Password == null) {
      this.setState({ alertStatus: true })
      this.setState({ warningStatus: 'warning' })
      this.setState({ errorMessage: 'Password can`t left blank' })
    }
    else if (this.state.Password.length < 8) {
      this.setState({ alertStatus: true })
      this.setState({ warningStatus: 'warning' })
      this.setState({ errorMessage: 'Password must be > 8 characters' })
    }
    else if (this.state.Name == "" || this.state.Name == null) {
      this.setState({ alertStatus: true })
      this.setState({ warningStatus: 'warning' })
      this.setState({ errorMessage: 'Name can`t left blank' })
    }
    else if (this.state.Email == "" || this.state.Email == null) {
      this.setState({ alertStatus: true })
      this.setState({ warningStatus: 'warning' })
      this.setState({ errorMessage: 'Email can`t left blank' })
    }
    else if (this.state.Email.length < 8) {
      this.setState({ alertStatus: true })
      this.setState({ warningStatus: 'warning' })
      this.setState({ errorMessage: 'Email must be > 8 characters' })
    }
    else {
      get(child(dbRef, 'user/info/' + this.state.Username)).then((snapshot) => {
        if (snapshot.exists()) {
          this.setState({ alertStatus: true })
          this.setState({ warningStatus: 'warning' })
          this.setState({ errorMessage: 'Angry Cat have exists username' })
        }
        else {
          set(child(dbRef, 'user/info/' + this.state.Username), {
            Username: this.state.Username,
            Email: this.state.Email,
            Name: this.state.Name,
            Password: this.state.Password,
            VScore: this.state.VScore,
            GScore: this.state.GScore,
            Image: this.state.Image,
          }); // custom key
          this.setState({ showModal: true })
        }
      }).catch((error) => {
        this.setState({ alertStatus: true })
        this.setState({ warningStatus: 'warning' })
        this.setState({ errorMessage: 'Could not get data from firebase', error })
      });
    }

  }

  render() {
    return (
      <View style={styles.container}>

        <Collapse mb={2} isOpen={this.state.alertStatus}>
          <Alert w="100%" maxW="400" status={this.state.warningStatus} colorScheme="warning">
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
          <Center >
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
              <VStack space={3} mt="3">
                <FormControl>
                  <FormControl.Label>Username</FormControl.Label>
                  <Input InputLeftElement={<Icon size="md" marginLeft={2} color="coolGray.600" icon as={FontAwesome} name="key" />} backgroundColor={"white"} placeholder="Enter your username" onChangeText={(text) => this.setState({ Username: text })} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input InputLeftElement={<Icon size="md" marginLeft={2} color="coolGray.600" icon as={FontAwesome} name="envelope" />} backgroundColor={"white"} placeholder="Enter your email" onChangeText={(text) => this.setState({ Email: text })} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input InputLeftElement={<Icon size="md" marginLeft={2} color="coolGray.600" icon as={FontAwesome} name="user" />} backgroundColor={"white"} placeholder="Enter your name" onChangeText={(text) => this.setState({ Name: text })} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input InputLeftElement={<Icon size="md" marginLeft={2} color="coolGray.600" icon as={FontAwesome} name="lock" />} backgroundColor={"white"} type="password" placeholder="Enter your password" onChangeText={(text) => this.setState({ Password: text })} />
                </FormControl>
                <Button mt="4" mb="4" backgroundColor="pink.400" onPress={() => this.handleRegister()}>
                  Sign up
                </Button>
              </VStack>
            </Box>


            <Box >
              <Modal backgroundColor="#cf8193" isOpen={this.state.showModal}>
                <Modal.Content maxWidth="700px">
                  <Modal.Header fontWeight="50">Register status</Modal.Header>
                  <Modal.Body backgroundColor="white">
                    <AspectRatio w="100%" ratio={4 / 4}>
                      <Image source={{
                        uri: 'https://angrycatblnt.herokuapp.com/images/goodscore.png'
                      }} alt="image" />
                    </AspectRatio>
                    <HStack margin={2} alignSelf="center">
                      <VStack >
                        <Text alignSelf="center" fontSize="lg" color="lime.500" bold>
                        Created successfully
                        </Text>
                      </VStack>
                    </HStack>

                  </Modal.Body>
                  <Modal.Footer alignSelf="center">
                    <Button borderRadius={100} backgroundColor="pink.400" onPress={() => this.returnToLogin()}>
                      OK
                    </Button>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
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