import React, { Component } from 'react';
import { Image, FlatList, Avatar, Box, HStack, Text, IconButton, Icon, Center, Heading, Stack, VStack, Spacer, Button, AspectRatio, ScrollView } from 'native-base';
import { ImageBackground, StyleSheet, View, SafeAreaView } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/colorbackground.png" };
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { VirtualizedList } from 'react-native-web';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Pronunciation from './PronunciationComponent';
       
class Dashboard extends Component {
    constructor(props) {
        super(props);
      }

    DashboardNavigation(name)
    {
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
            courseContent: "Popular Topics and Quizzes",
            avatarUrl: "https://angrycatblnt.herokuapp.com/images/vocabulary.png"          
        }, {
            id: "3",
            courseName: "Speaking",
            courseContent: "Hot Speaking Topics",
            avatarUrl: "https://angrycatblnt.herokuapp.com/images/speaking_2.png"
        }, {
            id: "4",
            courseName: "Grammar",
            courseContent: "Basic Sentences & Quizzes",
            avatarUrl: "https://angrycatblnt.herokuapp.com/images/grammar.png"
           
        }
       ];

        return (           
            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={{ flex:1 , justifyContent: "center" }}>
                        <Center flex={1} >
                        <AspectRatio w="100%" ratio={16 / 9}>
                      <Image mt={5} source={{
                        uri: "https://angrycatblnt.herokuapp.com/images/welcome.png"
                      }} alt="image" />
                    </AspectRatio>
                            <Box mt={5}  backgroundColor="white" height={387} borderRadius={10}>                       
                                <FlatList data={data}  renderItem={({
                                    item
                                }) => <Box borderBottomWidth="1" _dark={{
                                    borderColor: "muted.50"
                                }} borderColor="coolGray.200" pl="2" pr="2" py="5">
                                        <HStack space={3} justifyContent="space-between" >
                                            <Avatar size="48px" source={{
                                                uri: item.avatarUrl
                                            }} />
                                            <VStack>
                                                <Text _dark={{                                               
                                                    color: "warmGray.50"
                                                }}   fontSize={18} color="#cf8193" bold>
                                                    {item.courseName}
                                                </Text>
                                                
                                                <Text color="coolGray.600" _dark={{
                                                    color: "warmGray.200"
                                                }}>
                                                    {item.courseContent}
                                                </Text>
                                            </VStack>
                                            <Spacer/>  
                                            <VStack>
                                            <Button onPress={() => this.DashboardNavigation(item.courseName)}  backgroundColor="#cf8193" flexDirection="column" alignSelf="stretch"><Icon size="2xl" color="white" icon as={Ionicons} name="play-circle-outline"/></Button>
                                            </VStack>                                     
                                        </HStack>
                                    </Box>} keyExtractor={item => item.id} />
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