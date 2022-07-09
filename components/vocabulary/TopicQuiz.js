import React, { Component, useRef } from 'react';
import { Progress, Hidden, Image, Box, PresenceTransition, HStack, Text, Avatar, Fab, IconButton, Center, Heading, Modal, Icon, Button, AspectRatio, ScrollView, VStack, Collapse } from 'native-base';
import { ImageBackground, StyleSheet, View, TouchableOpacity } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/yellowquiz.png" };
const image1 = { uri: "https://angrycatblnt.herokuapp.com/images/bomb.png" };
import * as SecureStore from 'expo-secure-store';
import { Audio } from 'expo-av';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, child, onValue, get, set } from 'firebase/database';
import { useEffect } from 'react';
import * as Animation from 'react-native-animatable'

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
      color: 'coolGray.200',
      showModal: false,
      modalImage: '',
      timeColor: 'lime.400',
      userData: [],
      bonusShow: false,
      bonusScore: '',
      questionAnswer: [],
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
        // console.log(quizCount);
        this.setState({ quiz: quizCount });

        // var randomNumber = Math.floor(Math.random()*(this.state.quiz.length - 1))+1;
        var randomNumber = Math.floor(Math.random()*(this.state.quiz.length - 1))+1;   
        // questionAnswer.push(randomNumber);
        // console.log(this.state.questionAnswer);
        // if(this.state.questionAnswer.includes(randomNumber))
        // {
        //   alert("Trùng số");
        //   randomNumber = Math.floor(Math.random()*(this.state.quiz.length - 1))+1;   
        // }
        // else
        // {
        //   this.setState(previousState=>({questionAnswer: [...previousState.questionAnswer,randomNumber]}))    
        // }
        // onValue(child(dbRef, 'vocabulary/' + id + '/quizN/' + this.state.questionId), (snapshot) => {
        onValue(child(dbRef, 'vocabulary/' + id + '/quizN/' + randomNumber), (snapshot) => {
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
      });
    })
  }


  componentDidUpdate(previousProps, previousState) {
    if (previousState.questionId !== this.state.questionId) {
      setTimeout(()=>this.componentDidMount(),2000);
    }
  }

returnBonus(value)
{
  
}

  openFinalModal(score, showModal) {
    if (score >= (((this.state.quiz.length - 1) * 10) / 2)) {
      this.setState({ modalImage: "https://angrycatblnt.herokuapp.com/images/goodscore.png" });
    }
    else {
      this.setState({ modalImage: "https://angrycatblnt.herokuapp.com/images/badscore.png" });
    }

    SecureStore.getItemAsync('userinfo').then(data => {
      let User = JSON.parse(data)
      const DataUser = User.Username;
      const dbRef = ref(getDatabase());
      get(child(dbRef, 'user/info/' + DataUser)).then((snapshot) => {
        const UserData = snapshot.val();
        this.setState({ userData: UserData })
        set(child(dbRef, 'user/info/' + UserData.Username), {
          Username: this.state.userData.Username,
          Email: this.state.userData.Email,
          Name: this.state.userData.Name,
          Password: this.state.userData.Password,
          VScore: this.state.userData.VScore + score,
          GScore: this.state.userData.GScore,
          Image: this.state.userData.Image
        });
      })
    });
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
    this.setState({yourChoose: yourChoose});
    setTimeout(()=>this.setState({bonusShow: false}),2000);
    if (yourChoose == this.state.correct) {
      if (this.state.questionId == (this.state.quiz.length - 1)) {
        if (this.state.vocab.type == "Hard") {
          this.setState({bonusShow: true});
          this.setState({bonusScore: '+ 30'});
          this.setState(previousState => ({ score: previousState.score + 30 }));
        }
        else if (this.state.vocab.type == "Medium") {
          this.setState({bonusShow: true});
          this.setState({bonusScore: '+ 20'});
          this.setState(previousState => ({ score: previousState.score + 20 }));
        }
        else {
          this.setState({bonusShow: true});
          this.setState({bonusScore: '+ 10'});
          this.setState(previousState => ({ score: previousState.score + 10 }));
          this.returnBonus(10);
        }
        this.openFinalModal(this.state.score, true);
      }
      else {
        this.setState(previousState => ({ questionId: previousState.questionId + 1 }));
        if (this.state.vocab.type == "Hard") {
          this.setState({bonusShow: true});
          this.setState({bonusScore: '+ 30'});
          this.setState(previousState => ({ score: previousState.score + 30 }));
        }
        else if (this.state.vocab.type == "Medium") {
          this.setState({bonusShow: true});
          this.setState({bonusScore: '+ 20'});
          this.setState(previousState => ({ score: previousState.score + 20 }));
        }
        else {
          this.setState({bonusShow: true});
          this.setState({bonusScore: '+ 10'});
          this.setState(previousState => ({ score: previousState.score + 10 }));
          this.returnBonus(10);
        }
        this.colorChoose("lime.500");
      }
    }
    else {
      if (this.state.questionId == (this.state.quiz.length - 1)) {
        this.openFinalModal(this.state.score, true);
        }
      this.setState(previousState => ({ questionId: previousState.questionId + 1 }));
      this.setState({bonusShow: true});
      this.setState({bonusScore: '+  0'});
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

            <Box  width={350} height={70} _dark={{
              borderColor: "muted.50"
            }} borderColor="coolGray.200" px="2" backgroundColor="white" borderLeftWidth={1} borderBottomWidth={1} borderRadius={10}>

              <HStack space={20}>
                <VStack p={1} justifyContent="space-between">
                  <Heading  pt={1} color="amber.600" size="md">
                    {this.state.vocab.type} <Text color="amber.700">({this.state.vocab.level})</Text>
                  </Heading>

                  <Heading  fontWeight="light" color="black" size="xs">
                    Your questions: {this.state.questionId}/{this.state.quiz.length - 1}
                  </Heading>
                </VStack>

               
              </HStack>
            </Box>
          
            <Center>
              <Box backgroundColor="white" mt={2} width={200} height={200} rounded="xl" overflow="hidden" borderColor="white" borderWidth="1" alignItems="center">
                <AspectRatio w="100%" ratio={4 / 4}>
                  <Image w="100%" source={{
                    uri: "https://angrycatblnt.herokuapp.com/vocabulary/"+this.state.question
                  }} alt="image" />
                </AspectRatio>
              </Box>
            </Center>

            <Animation.View animation="fadeIn" duration={2000} delay={1000} easing="ease-in">
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
            </Animation.View>

            <Animation.View animation="fadeIn" duration={2000} delay={1000} easing="ease-in">
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
            </Animation.View>


            <Animation.View animation="fadeIn" duration={2000} delay={1000} easing="ease-in">
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
            </Animation.View>

            <Animation.View animation="fadeIn" duration={2000} delay={1000} easing="ease-in">
            <TouchableOpacity onPress={() => this.nextQuestion(this.state.choiceD)}>
              <Box mt={3} mb={3} width={330} borderBottomWidth="1" borderRightWidth="1" backgroundColor="white" height={65} borderRadius={100} _dark={{
                borderColor: "muted.50"
              }} borderColor={this.state.color} p="2">
                <HStack space={2} justifyContent="space-between" >
                  <HStack>
                    <Avatar alignSelf="center" width={50} source={{
                      uri: "https://angrycatblnt.herokuapp.com/images/choiceD_straight.png"
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
            </Animation.View>

            <Box>
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

            <Box>
              <Modal isOpen={this.state.bonusShow}>
                <Modal.Content maxWidth="700px">
                  <Modal.Header fontWeight="50">Check your answer</Modal.Header>
                  <Modal.Body backgroundColor="white">                  
                    <HStack margin={1} alignSelf="center">
                      <VStack >
                          <Text alignSelf="center" fontSize={25} color={this.state.color} bold>
                          {this.state.bonusScore}
                          </Text>

                        <Text alignSelf="center" fontSize={18} color="#cf8193" bold>
                          Your answer is:  { }
                          <Text alignSelf="center" fontSize={20} color={this.state.color} bold>
                            {this.state.yourChoose}
                          </Text>
                        </Text>

                        <Text alignSelf="center" fontSize={18} color="#cf8193" bold>
                          Correct is:  { }
                          <Text alignSelf="center" fontSize={20} color="lime.400" bold>
                            {this.state.correct}
                          </Text>
                        </Text>
                      </VStack>
                    </HStack>

                  </Modal.Body>
                  <Modal.Footer alignSelf="center">
                    <Button borderRadius={100} backgroundColor="pink.400" onPress={() => this.setState({bonusShow: false})}>
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