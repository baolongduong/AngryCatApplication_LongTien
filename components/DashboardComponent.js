import React, { Component } from 'react';
import { Image, FlatList, Avatar, Box, HStack, Text, IconButton, Icon, Center, Heading, Stack, VStack, Spacer, Button, AspectRatio, ScrollView } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/colorbackground.png" };
import { MaterialIcons } from '@expo/vector-icons';

class Dashboard extends Component {


    render() {
        const data = [{
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            fullName: "Aafreen Khan",
            timeStamp: "12:47 PM",
            recentText: "Good Day!",
            avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }, {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            fullName: "Sujitha Mathur",
            timeStamp: "11:11 PM",
            recentText: "Cheer up, there!",
            avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
        }, {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            fullName: "Anci Barroco",
            timeStamp: "6:22 PM",
            recentText: "Good Day!",
            avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
        }, {
            id: "68694a0f-3da1-431f-bd56-142371e29d72",
            fullName: "Aniket Kumar",
            timeStamp: "8:56 PM",
            recentText: "All the best",
            avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
        }];

        return (
            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={{ flex:1 , justifyContent: "center" }}>
                    <ScrollView>
                        <Center flex={1}>
                            <Box mt={10}>
                                <FlatList data={data} numColumns={2} renderItem={({
                                    item
                                }) => <Box borderBottomWidth="1" _dark={{
                                    borderColor: "muted.50"
                                }} borderColor="muted.800" pl="4" pr="5" py="2">
                                        <HStack space={3} justifyContent="space-between">
                                            <Avatar size="48px" source={{
                                                uri: item.avatarUrl
                                            }} />
                                            <VStack>
                                                <Text _dark={{
                                                    color: "warmGray.50"
                                                }} color="coolGray.800" bold>
                                                    {item.fullName}
                                                </Text>
                                                <Text color="coolGray.600" _dark={{
                                                    color: "warmGray.200"
                                                }}>
                                                    {item.recentText}
                                                </Text>
                                            </VStack>
                                            <Spacer />
                                          
                                        </HStack>
                                    </Box>} keyExtractor={item => item.id} />
                            </Box>;
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


export default Dashboard;