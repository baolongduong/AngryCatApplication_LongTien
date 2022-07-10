import React, { Component } from 'react';
import { Image, StatusBar, Box, HStack, Text, Avatar, Icon, Center, Heading, Stack, Link, Button, AspectRatio, ScrollView, VStack } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowquiz.png" };
import * as SecureStore from 'expo-secure-store'
import { getDatabase, ref, child, push, set, get } from 'firebase/database';

class GrammarLessons extends Component {
  constructor(props) {
    super(props);  
    this.state = {
        grammar: [],
      } 
  }

  componentDidMount() {

    //Get Vocabulary Content
    SecureStore.getItemAsync('grammarId').then(data => {
      let lessons = JSON.parse(data)
      const id = lessons.id;
        console.log("Grammar Id la "+id)
      const dbRef = ref(getDatabase());
      get(child(dbRef, 'grammar/' + id)).then((snapshot) => {
        const grammarData = snapshot.val();
        // console.log(vocabData);
        this.setState({ grammar: grammarData })
      })
    })
  }

  grammarQuiz()
  {
    this.props.navigation.navigate("GrammarQuiz");
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <ScrollView>
            <Center >
          
            <HStack justifyContent="center" height="100%" borderRadius="30" borderColor="black" >        
                <VStack >
                <Heading mt={5} mb={1} textAlign="center" color="amber.800">{this.state.grammar.TenseName}</Heading>
            <Button  mt={1} mb={1} alignSelf="center" onPress={()=>this.grammarQuiz()} width={200} borderRadius={20} color="white" backgroundColor="#cf8193">
              Attempt Quiz ⧁
              </Button> 

                <VStack  p="3" space={10} flex="1" backgroundColor="white" borderColor="black" marginTop="2" >
                <Text bold>Definition: 
                <Text fontWeight="light"> {this.state.grammar.GrammarDefinition}</Text>
                </Text>

                <Text bold>Use: 
                <Text fontWeight="light"> {this.state.grammar.GrammarUse}</Text>
                </Text>

                <Text bold>Sign: 
                <Text fontWeight="light"> {this.state.grammar.GrammarSign}</Text>
                </Text>

                <Text bold>Postive: 
                <Text fontWeight="extrabold" color="lime.500"> {this.state.grammar.PSentences}</Text>
                </Text>
                <Text textAlign="center" fontStyle="italic" fontWeight="light">{this.state.grammar.PExample}</Text>
                <Text bold>Negative: 
                <Text fontWeight="extrabold" color="danger.500"> {this.state.grammar.NSentences}</Text>
                </Text>

                <Text textAlign="center" fontStyle="italic" fontWeight="light">{this.state.grammar.NExample}</Text>
          
                <Text bold>Question: 
                <Text fontWeight="extrabold"  color="warning.500"> {this.state.grammar.Qsentences}</Text>
                </Text>
                 <Text textAlign="center" fontStyle="italic" fontWeight="light">{this.state.grammar.QExample}</Text>
                 </VStack>
               </VStack>   
            </HStack>
          </Center>
          </ScrollView>
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


export default GrammarLessons;