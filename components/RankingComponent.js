import React, { Component } from 'react';
import { Image, StatusBar, FlatList, Box, Badge, HStack, Text, Avatar, Icon, Center, Heading, Stack, Link, Button, AspectRatio, ScrollView, VStack } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/dashboardBackground.png" };
import * as SecureStore from 'expo-secure-store'
import { getDatabase, ref, child, push, set, get } from 'firebase/database';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as Animation from 'react-native-animatable'

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      userData: []
    }
  }

  componentDidMount() {

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


    const dbRef = ref(getDatabase());
    get(child(dbRef, 'user/info')).then((snapshot) => {
      // const words = snapshot.val();
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          Image: child.val().Image,
          Username: child.val().Username,
          VScore: child.val().VScore,
          GScore: child.val().GScore,
          Total: child.val().VScore + child.val().GScore,
        })
      });
      items.sort((a, b) => a.Total < b.Total);
      const newb = items.slice(0, 11);
      this.setState({ listUser: newb })
      // console.log(this.state.listUser);
    })
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.listUser !== this.state.listUser) {
      this.componentDidMount();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Center flex={1} >
         
            {/* <Box safeArea mt={2} mb={1}>
              <Heading textAlign="center" color="amber.800">TOP 10 of ANGRY CAT</Heading>
              <Text _dark={{
                color: "warmGray.50"
              }} color="amber.600" textAlign="center" fontSize="lg" bold>
                Your score: {this.state.userData.VScore + this.state.userData.GScore}
              </Text>
            </Box> */}
             <Badge
                          colorScheme="amber" rounded="full" mt={-3} zIndex={1} variant="solid" alignSelf="center" _text={{
                            fontSize: 12
                          }}>
                         {"Your score: " + (this.state.userData.VScore + this.state.userData.GScore)}
                        </Badge>

            <FlatList mt={2}   numColumns={1} data={this.state.listUser} renderItem={({
              item, index
            }) => {
              if (index == 0) {
                return <>
                  <Box height={180} borderRadius={20} justifyContent="space-between" borderColor="coolGray.300" borderRightWidth="1" borderBottomWidth={1} alignItems="center" backgroundColor="white"  width={140} _dark={{
                    borderColor: "muted.50"
                  }} py="1" >
                    <VStack alignContent="center"  mb={1} justifyContent="space-between"  >
                      <VStack>

                        <Text color="yellow" alignSelf="center" pb={1} >
                          <Icon size="md" color="yellow.500" icon as={FontAwesome5} name="crown" />
                        </Text>
                        <Avatar borderColor="yellow.400" borderWidth={3} alignSelf="center" size="100px" source={{
                          uri: item.Image
                        }} />

                        <Badge
                          colorScheme="warning" rounded="full" mt={-4} zIndex={1} variant="solid" alignSelf="center" _text={{
                            fontSize: 12
                          }}>
                          {'#' + (index + 1) + "  |  " + item.Total}
                        </Badge>

                        <Text alignSelf="center" color="danger.700" fontSize="sm" bold>
                          {item.Username}
                        </Text>



                      </VStack>
                    </VStack>
                  </Box>
                </>
              }
            }} />


            <FlatList  numColumns={3} data={this.state.listUser} renderItem={({
              item, index
            }) => {
              if (index == 1 || index == 2) {
                return <>
                  <Box borderRadius={20} justifyContent="space-between" borderColor="coolGray.300" borderRightWidth="1" borderBottomWidth={1} mt={1} mb={1} alignItems="center" backgroundColor="white" height="180" width={140} margin={1} _dark={{
                    borderColor: "muted.50"
                  }} py="1"  >
                    <Text alignSelf="center" color="yellow" pb={1}>
                      <Icon size="md" color="coolGray.500" icon as={FontAwesome5} name="chess-queen" />
                    </Text>

                    <Avatar alignSelf="center" borderColor="warmGray.400" borderWidth={3} size="100px" source={{
                      uri: item.Image
                    }} />

                    <Badge
                      alignSelf="center" colorScheme="success" rounded="full" mt={-4} zIndex={1} variant="solid" _text={{
                        fontSize: 12
                      }}>
                      {'#' + (index + 1) + "  |  " + item.Total}
                    </Badge>

                    <Text alignSelf="center" color="amber.700" fontSize="xs" bold>
                      {item.Username}
                    </Text>
                  </Box>
                </>
              }
            }} />

<FlatList  mb={2}  numColumns={3} data={this.state.listUser} renderItem={({
              item, index
            }) => {
              if (index > 2) {
                return <>
                  <Box borderRadius={20} justifyContent="space-between" borderColor="coolGray.300" borderRightWidth="1" borderBottomWidth={1} mt={1} alignItems="center" backgroundColor="white" height="100" width="100" margin={1} _dark={{
                    borderColor: "muted.50"
                  }} py="1"  >
                   

                    <Avatar mt={3} alignSelf="center" borderColor="warmGray.400" borderWidth={3} size="50px" source={{
                      uri: item.Image
                    }} />

                    <Badge
                      alignSelf="center" colorScheme="info" rounded="full" mt={-3} zIndex={1} variant="solid" _text={{
                        fontSize: 12
                      }}>
                      {'#' + (index + 1) + "  |  " + item.Total}
                    </Badge>

                    <Text alignSelf="center" color="coolGray.700" fontSize={9} bold>
                      {item.Username}
                    </Text>
                  </Box>
                </>
              }
            }} />


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


export default Ranking;