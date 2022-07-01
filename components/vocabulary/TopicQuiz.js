import React, { Component, useRef } from 'react';
import { Progress, Divider, Image, Box, HStack, Text, Avatar, Fab, IconButton, Center, Heading, Modal, Icon, Button, AspectRatio, ScrollView, VStack } from 'native-base';
import { ImageBackground, StyleSheet, View, TouchableOpacity } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowquiz.png" };
import * as SecureStore from 'expo-secure-store';
import { Audio } from 'expo-av';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, child, onValue, get } from 'firebase/database';
import { useEffect } from 'react';


class TopicQuiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vocab: [],
      quiz: [],

      questionId: 1,
      question: '',
      choiceA: '',
      choiceB: '',
      choiceC: '',
      choiceD: '',
      correct: '',

      yourChoose: '',
      score: 0,
      time: 100,
      progress: 10,
      color: 'coolGray.200',
      showModal: false,
      modalImage: '',
      timeColor: 'lime.400'
    };
  }

  componentDidMount() {
    //Get Vocabulary Content
    SecureStore.getItemAsync('vocabularyId').then(data => {
      let vocab = JSON.parse(data)
      const id = vocab.id;

      const dbRef = ref(getDatabase());
      get(child(dbRef, 'vocabulary/' + id)).then((snapshot) => {
        const vocabData = snapshot.val();
        this.setState({ vocab: vocabData })
      });

      get(child(dbRef, 'vocabulary/' + id + '/quizN/')).then((snapshot) => {
        const quizCount = snapshot.val();
        console.log(quizCount);
        this.setState({ quiz: quizCount });
      });


      onValue(child(dbRef, 'vocabulary/' + id + '/quizN/' + this.state.questionId), (snapshot) => {
        const quizData = snapshot.val();
        // console.log(quizData);
        this.setState({
          question: quizData.question,
          choiceA: quizData.choiceA,
          choiceB: quizData.choiceB,
          choiceC: quizData.choiceC,
          choiceD: quizData.choiceD,
          correct: quizData.correct,
        });
      });
    })
    this.timer();
  }


  componentDidUpdate(previousProps, previousState) {
    if (previousState.questionId !== this.state.questionId) {
      this.componentDidMount();
    }
  }


  timer() {
    setInterval(() => {
      if (this.time < 1) {
        clearInterval();
        this.openFinalModal(this.state.score, true);
      }
      else {
        this.setState(previousState => ({ time: previousState.time - 1 }));
        if(this.state.time > 70)
        {
          this.setState({ timeColor: "lime.400" });
        }
        else if(this.state.time < 70)
        {
          this.setState({ timeColor: "warning.400" });
        }
        else if(this.state.time < 30)
        {
          this.setState({ timeColor: "hard.400" });
        }
      }
    }, 1500)

  }

  openFinalModal(score, showModal) {
    if (score >= (((this.state.quiz.length - 1) * 10) / 2)) {
      this.setState({ modalImage: "https://angrycatblnt.herokuapp.com/images/goodscore.png" });
    }
    else {
      this.setState({ modalImage: "https://angrycatblnt.herokuapp.com/images/badscore.png" });
    }
    this.setState({ showModal: showModal });
  }

  returnToVocabularyPage() {
    this.props.navigation.navigate("VocabularyTopic");
  }

  pronunciationPlay = async () => {
    console.log(this.state.mp3)
    const { sound } = await Audio.Sound.createAsync(
      { uri: this.state.mp3 }, { shouldPlay: false });
    await sound.playAsync();
  }

  nextQuestion(yourChoose) {
    if (yourChoose == this.state.correct) {
      if (this.state.questionId == (this.state.quiz.length - 1)) {
        this.openFinalModal(this.state.score, true);
      }
      else {
        this.setState(previousState => ({ questionId: previousState.questionId + 1 }));
        if (this.state.vocab.type == "Hard") {
          this.setState(previousState => ({ time: previousState.time + 30 }));
          this.setState(previousState => ({ score: previousState.score + 30 }));
        }
        else if (this.state.vocab.type == "Medium") {
          this.setState(previousState => ({ time: previousState.time + 20 }));
          this.setState(previousState => ({ score: previousState.score + 20 }));
        }
        else {
          this.setState(previousState => ({ time: previousState.time + 10 }));
          this.setState(previousState => ({ score: previousState.score + 10 }));
        }
        this.colorChoose("lime.500");
      }
    }
    else {
      this.setState(previousState => ({ questionId: previousState.questionId + 1 }));
      this.colorChoose("danger.500");
    }
  }

  colorChoose(color) {
    this.setState({ color: color })
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Center>

            <Box mt={1} width={320} height={60} _dark={{
              borderColor: "muted.50"
            }} borderColor="coolGray.200" px="2" backgroundColor="white" borderLeftWidth={1} borderBottomWidth={1} borderRadius={10}>

              <HStack space={2}>
                <VStack p={1} justifyContent="space-between">
                  <Heading color="amber.600" size="md">
                    {this.state.vocab.type} <Text color="amber.700">({this.state.vocab.level})</Text>
                  </Heading>

                  <Heading fontWeight="light" color="black" size="xs">
                    Your questions: {this.state.questionId}/{this.state.quiz.length - 1}
                  </Heading>
                </VStack>

                <IconButton></IconButton>
              </HStack>

            </Box>
            <Fab mt={300} backgroundColor={this.state.timeColor} placement="top-right" icon={<Icon color="white" as={<Ionicons name="watch" />} size={4} />} label={<Text color="white" fontSize="sm">
              {this.state.time}
            </Text>} />
            <Center>

              <Box backgroundColor="white" mt={2} width={200} height={200} rounded="xl" overflow="hidden" borderColor="white" borderWidth="1" alignItems="center">
                <AspectRatio w="100%" ratio={4 / 4}>
                  <Image w="100%" source={{
                    uri: 'https://angrycatblnt.herokuapp.com/vocabulary/' + this.state.question
                  }} alt="image" />
                </AspectRatio>
              </Box>
            </Center>

            <TouchableOpacity onPress={() => this.nextQuestion(this.state.choiceA)}>
              <Box mt={3} width={330} borderBottomWidth="1" borderRightWidth="1" backgroundColor="white" height={65} borderRadius={100} _dark={{
                borderColor: "muted.50"
              }} borderColor={this.state.color} p="2">
                <HStack space={2} justifyContent="space-between" >
                  <HStack>
                    <Avatar alignSelf="center" width={50} source={{
                      uri: "https://angrycatblnt.herokuapp.com/images/choiceA.png"
                    }} />
                    <HStack pl={10}>
                      <VStack alignSelf="center">
                        <Text fontSize={20} color="#cf8193" bold>
                          {this.state.choiceA}
                        </Text>
                      </VStack>
                    </HStack>
                  </HStack>
                </HStack>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.nextQuestion(this.state.choiceB)}>
              <Box mt={3} width={330} borderBottomWidth="1" borderRightWidth="1" backgroundColor="white" height={65} borderRadius={100} _dark={{
                borderColor: "muted.50"
              }} borderColor={this.state.color} p="2">
                <HStack space={2} justifyContent="space-between" >
                  <HStack>
                    <Avatar alignSelf="center" width={50} source={{
                      uri: "https://angrycatblnt.herokuapp.com/images/choiceB.png"
                    }} />

                    <HStack pl={10}>
                      <VStack alignSelf="center">
                        <Text fontSize={20} color="#cf8193" bold>
                          {this.state.choiceB}
                        </Text>
                      </VStack>
                    </HStack>
                  </HStack>
                </HStack>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.nextQuestion(this.state.choiceC)}>
              <Box mt={3} width={330} borderBottomWidth="1" borderRightWidth="1" backgroundColor="white" height={65} borderRadius={100} _dark={{
                borderColor: "muted.50"
              }} borderColor={this.state.color} p="2">
                <HStack space={2} justifyContent="space-between" >
                  <HStack>
                    <Avatar alignSelf="center" width={50} source={{
                      uri: "https://angrycatblnt.herokuapp.com/images/choiceC.png"
                    }} />
                    <HStack pl={10}>
                      <VStack alignSelf="center">
                        <Text fontSize={20} color="#cf8193" bold>
                          {this.state.choiceC}
                        </Text>
                      </VStack>
                    </HStack>
                  </HStack>
                </HStack>
              </Box>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => this.nextQuestion(this.state.choiceD)}>
              <Box mt={3} mb={3} width={330} borderBottomWidth="1" borderRightWidth="1" backgroundColor="white" height={65} borderRadius={100} _dark={{
                borderColor: "muted.50"
              }} borderColor={this.state.color} p="2">
                <HStack space={2} justifyContent="space-between" >
                  <HStack>
                    <Avatar alignSelf="center" width={50} source={{
                      uri: "https://angrycatblnt.herokuapp.com/images/choiceDNew.png"
                    }} />

                    <HStack pl={10}>
                      <VStack alignSelf="center">
                        <Text fontSize={20} color="#cf8193" bold>
                          {this.state.choiceD}
                        </Text>
                      </VStack>
                    </HStack>
                  </HStack>
                </HStack>
              </Box>
            </TouchableOpacity>

            <Box >
              <Modal backgroundColor="yellow.400" isOpen={this.state.showModal}>
                <Modal.Content maxWidth="700px">
                  <Modal.Header fontWeight="50">Quiz Score</Modal.Header>
                  <Modal.Body backgroundColor="white">
                    <AspectRatio w="100%" ratio={4 / 4}>
                      <Image source={{
                        uri: this.state.modalImage
                      }} alt="image" />
                    </AspectRatio>
                    <HStack margin={1} alignSelf="center">
                      <VStack >
                        <Text alignSelf="center" fontSize={18} color="#cf8193" bold>
                          Your score is:  { }
                          <Text alignSelf="center" fontSize={20} color="lime.400" bold>
                            {this.state.score}/{(this.state.quiz.length - 1) * 10}
                          </Text>
                        </Text>

                      </VStack>
                    </HStack>

                  </Modal.Body>
                  <Modal.Footer alignSelf="center">
                    <Button borderRadius={100} backgroundColor="pink.400" onPress={() => this.returnToVocabularyPage()}>
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


export default TopicQuiz;