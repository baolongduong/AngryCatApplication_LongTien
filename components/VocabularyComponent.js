import React, { Component, useEffect } from 'react';
import { Image, FlatList, Avatar, Box, HStack, Text, IconButton, Icon, Center, Heading, Stack, VStack, Spacer, Button, AspectRatio, ScrollView } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowquiz.png" };
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { getDatabase, ref, child, onValue, get } from 'firebase/database';
import VocabularyTopic from './vocabulary/VocabularyTopic';
import { TouchableOpacity } from 'react-native-gesture-handler';



class Vocabulary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      vocalId: 0,
    }
  }

  componentDidMount() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'vocabulary')).then((snapshot) => {
      const account = snapshot.val();
      //  console.log(account);
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          id: child.val().id,
          type: child.val().type,
          icon: child.val().icon
        })
      });
      this.setState({ data: items })
      //  console.log(this.state.data);                
    })
  }

  getVocabularyTopicID(id) {
    console.log("Da lay id: " + id);
    SecureStore
      .setItemAsync('vocabularyId', JSON.stringify({ id: id }))
      .catch((error) => alert('Could not save user info', error));
    this.props.navigation.navigate("VocabularyTopic");
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Center flex={1} >
            <Box borderRadius={10}>         
              <FlatList numColumns={3} data={this.state.data}          
              renderItem={({
                item
              }) =>
              <TouchableOpacity onPress={() => this.getVocabularyTopicID(item.id)}>
                
                <Box borderRadius={20} justifyContent="space-between" borderColor="coolGray.300" borderRightWidth="1" borderBottomWidth={1} mt={4} mb={1} alignItems="center" backgroundColor="white" height={110} width={100} margin={2}  _dark={{
                  borderColor: "muted.50"
                }}  py="5"  >               
                  <Icon alignSelf="center" size="4xl" color="#cf8193" icon as={FontAwesome} name={item.icon} /> 

                    <Text    _dark={{
                      color: "warmGray.50"
                    }} margin={2}  textAlign="center" fontStyle="normal" fontSize={10} alignSelf="center" color="#cf8193" bold>   
                    {item.type}              
                    </Text> 
  

                </Box>

                 
                </TouchableOpacity>
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