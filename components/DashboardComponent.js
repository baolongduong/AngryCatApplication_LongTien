import React, { Component } from 'react';
import { Image, FlatList, Avatar, Box, HStack, Text, IconButton, Icon, Center, Heading, Stack, VStack, Spacer, Button, AspectRatio, ScrollView } from 'native-base';
import { ImageBackground, StyleSheet, View, SafeAreaView } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/registerBackground.png" };
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { VirtualizedList } from 'react-native-web';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Pronunciation from './PronunciationComponent';
import * as Animation from 'react-native-animatable'

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    DashboardNavigation(name) {
        this.props.navigation.navigate(name);
    }

    render() {
        const data = [{
            id: "1",
            courseName: "Pronunciation",
            courseContent: "IPA and Examples",
            avatarUrl: "https://angrycatblnt.herokuapp.com/images/pronunciation.png",
        }, {
            id: "2",
            courseName: "Vocabulary",
            courseContent: "Topics and Quizzes",
            avatarUrl: "https://angrycatblnt.herokuapp.com/images/vocabulary.png"
        }, {
            id: "3",
            courseName: "Speaking",
            courseContent: "Hot Speaking Topics",
            avatarUrl: "https://angrycatblnt.herokuapp.com/images/speaking_2.png"
        }, {
            id: "4",
            courseName: "Grammar",
            courseContent: "12 Sentences & Quizzes",
            avatarUrl: "https://angrycatblnt.herokuapp.com/images/grammar.png"
        }
        , {
            id: "5",
            courseName: "About",
            courseContent: "About Us",
            avatarUrl: "https://angrycatblnt.herokuapp.com/images/angryCatLogo.png"
        }
        ];
        return (
            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
                    <Center flex={1} safeArea >

              
                
                        <Box mt={20}  height="100%" justifyContent= "center"  >
                       
                    
                        <VStack ml={5} mb={1} >
                        <Heading  fontSize="3xl" fontWeight="light" color="#cf8193">
                                HOME
                            </Heading>    
                     </VStack>
                     <Animation.View animation="fadeIn" duration={2000} delay={1000}>
                            <FlatList data={data} renderItem={({
                                item
                            }) => <Box borderBottomWidth="1" borderRightWidth="1" _dark={{
                                borderColor: "muted.50"
                            }} borderRadius={20} backgroundColor="white" borderColor="coolGray.200"  pl="2" pr="2" py="5" margin={2} >
                                    <HStack space={3} justifyContent="space-between" >
                                        <Avatar size="48px" source={{
                                            uri: item.avatarUrl
                                        }} />
                                        <VStack>
                                            <Text _dark={{
                                                color: "warmGray.50"
                                            }} fontSize={18} color="#cf8193" fontWeight="medium">
                                                {item.courseName}
                                            </Text>

                                            <Text color="coolGray.600" _dark={{
                                                color: "warmGray.200"
                                            }}>
                                                {item.courseContent}
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        <VStack>
                                            <Button borderRadius={30} onPress={() => this.DashboardNavigation(item.courseName)} backgroundColor="#cf8193" flexDirection="column" alignSelf="stretch"><Icon size="2xl" color="white" icon as={Ionicons} name="play-circle-outline" /></Button>
                                        </VStack>
                                    </HStack>
                                </Box>} keyExtractor={item => item.id} />
                                </Animation.View>
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


export default Dashboard;