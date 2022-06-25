import React, { Component, useEffect } from 'react';
import { Image, FlatList, Avatar, Box, HStack, Text, IconButton, Icon, Center, Heading, Stack, VStack, Spacer, Button, AspectRatio, ScrollView } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/colorbackground.png" };
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, child, onValue, get } from 'firebase/database';



class Vocabulary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount()
  {
   const dbRef = ref(getDatabase());
         get(child(dbRef, 'vocabulary')).then((snapshot) => {
                 const account = snapshot.val();
                 console.log(account);
                 var items = [];
                 snapshot.forEach((child)=>
                 {
                  items.push({
                  id: child.val().id,
                  type:child.val().type
                })
                 });
                 this.setState({ data: items })
                 console.log(this.state.data);
         })
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.data !== this.state.data) {
      this.componentDidMount();
    }
  }

  render() {
    // const data = [{
    //   id: "1",
    //   courseName: "Pronunciation",
    //   courseContent: "IPA and Examples",
    //   avatarUrl: "gift-outline",
    // }, {
    //   id: "2",
    //   courseName: "Vocabulary",
    //   courseContent: "Popular Topics and Quizzes",
    //   avatarUrl: "american-football-sharp"
    // }, {
    //   id: "3",
    //   courseName: "Speaking",
    //   courseContent: "Hot Speaking Topics",
    //   avatarUrl: "analytics"
    // }, {
    //   id: "4",
    //   courseName: "Grammar",
    //   courseContent: "Basic Sentences & Quizzes",
    //   avatarUrl: "chevron-back-circle"

    // }];
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Center flex={1} >
            <Box borderRadius={10}>         
              <FlatList numColumns={2} data={this.state.data}          
              renderItem={({
                item
              }) =>
                <Box justifyContent="space-between" alignItems="center" backgroundColor="white" width={150} borderRadius={100} margin={4} borderBottomWidth="1" _dark={{
                  borderColor: "muted.50"
                }} borderColor="coolGray.200" pl="2" pr="2" py="5">
                  <Icon size="6xl" color="coolGray.500" icon as={Ionicons} name="gift-outline" />
                  <Spacer />
                  <HStack>
                    <Text _dark={{
                      color: "warmGray.50"
                    }} fontStyle="normal" fontSize={12} color="#cf8193" bold>   
                    {item.type}              
                    </Text> 
                  </HStack>
                </Box>
              }     keyExtractor={item=>item.id} /> 
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


export default Vocabulary;