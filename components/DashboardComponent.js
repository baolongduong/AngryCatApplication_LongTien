import React, { Component } from 'react';
import { Image, StatusBar, Box, HStack, Text, IconButton, Icon, Center, Heading, Stack, Link, Button, AspectRatio, ScrollView } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
const image = { uri: "https://angrycatblnt.herokuapp.com/images/colorbackground.png" };

class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
                    <ScrollView>
                        <Center>

                            <Box mt="5" alignItems="center">
                                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                                    borderColor: "coolGray.600",
                                    backgroundColor: "gray.700"
                                }} _web={{
                                    shadow: 2,
                                    borderWidth: 0
                                }} _light={{
                                    backgroundColor: "gray.50"
                                }}>
                                    <Box>
                                        <AspectRatio w="100%" ratio={16 / 9}>
                                            <Image source={{
                                                uri: "https://angrycatblnt.herokuapp.com/images/catpronunciation2.png"
                                            }} alt="image" />
                                        </AspectRatio>
                                        <Center bg="info.500" _dark={{
                                            bg: "violet.400"
                                        }} _text={{
                                            color: "warmGray.50",
                                            fontWeight: "700",
                                            fontSize: "xs"
                                        }} position="absolute" bottom="0" px="3" py="1.5">
                                            PRONUNCIATION
                                        </Center>
                                    </Box>
                                    <Stack p="4" space={3}>
                                        <Stack space={2}>
                                            <Heading size="md" ml="-1">
                                                IPA (Learn & Examples)
                                            </Heading>
                                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                                color: "warmGray.200"
                                            }}>
                                                Improve your English pronunciation
                                            </Text>
                                            <Button size="sm" colorScheme="pink">
                                                Go
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Box>

                            <Box mt="5" alignItems="center">
                                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                                    borderColor: "coolGray.600",
                                    backgroundColor: "gray.700"
                                }} _web={{
                                    shadow: 2,
                                    borderWidth: 0
                                }} _light={{
                                    backgroundColor: "gray.50"
                                }}>
                                    <Box>
                                        <AspectRatio w="100%" ratio={16 / 9}>
                                            <Image source={{
                                                uri: "https://angrycatblnt.herokuapp.com/images/catgrammar.png"
                                            }} alt="image" />
                                        </AspectRatio>
                                        <Center bg="violet.500" _dark={{
                                            bg: "violet.400"
                                        }} _text={{
                                            color: "warmGray.50",
                                            fontWeight: "700",
                                            fontSize: "xs"
                                        }} position="absolute" bottom="0" px="3" py="1.5">
                                            GRAMMAR
                                        </Center>
                                    </Box>
                                    <Stack p="4" space={3}>
                                        <Stack space={2}>
                                            <Heading size="md" ml="-1">
                                                Grammar (Full Practice)
                                            </Heading>
                                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                                color: "warmGray.200"
                                            }}>
                                                Full of grammar lessons
                                            </Text>
                                            <Button size="sm" colorScheme="pink">
                                                Go
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Box>


                            <Box mt="5" alignItems="center">
                                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                                    borderColor: "coolGray.600",
                                    backgroundColor: "gray.700"
                                }} _web={{
                                    shadow: 2,
                                    borderWidth: 0
                                }} _light={{
                                    backgroundColor: "gray.50"
                                }}>
                                    <Box>
                                        <AspectRatio w="100%" ratio={16 / 9}>
                                            <Image source={{
                                                uri: "https://angrycatblnt.herokuapp.com/images/catvocabulary.png"
                                            }} alt="image" />
                                        </AspectRatio>
                                        <Center bg="orange.400" _dark={{
                                            bg: "blue.400"
                                        }} _text={{
                                            color: "warmGray.50",
                                            fontWeight: "700",
                                            fontSize: "xs"
                                        }} position="absolute" bottom="0" px="3" py="1.5">
                                            VOCABULARY
                                        </Center>
                                    </Box>
                                    <Stack p="4" space={3}>
                                        <Stack space={2}>
                                            <Heading size="md" ml="-1">
                                                Vocabulary (Full Practice)
                                            </Heading>
                                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                                color: "warmGray.200"
                                            }}>
                                                Improve your English vocabulary
                                            </Text>
                                            <Button size="sm" colorScheme="pink">
                                                Go
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Box>

                            <Box mt="5" mb="5" alignItems="center">
                                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                                    borderColor: "coolGray.600",
                                    backgroundColor: "gray.700"
                                }} _web={{
                                    shadow: 2,
                                    borderWidth: 0
                                }} _light={{
                                    backgroundColor: "gray.50"
                                }}>
                                    <Box>
                                        <AspectRatio w="100%" ratio={16 / 9}>
                                            <Image source={{
                                                uri: "https://angrycatblnt.herokuapp.com/images/catspeaking.png"
                                            }} alt="image" />
                                        </AspectRatio>
                                        <Center bg="green.400" _dark={{
                                            bg: "violet.400"
                                        }} _text={{
                                            color: "warmGray.50",
                                            fontWeight: "700",
                                            fontSize: "xs"
                                        }} position="absolute" bottom="0" px="3" py="1.5">
                                            SPEAKING
                                        </Center>
                                    </Box>
                                    <Stack p="4" space={3}>
                                        <Stack space={2}>
                                            <Heading size="md" ml="-1">
                                                Greeting with Topics
                                            </Heading>
                                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                                color: "warmGray.200"
                                            }}>
                                                Improve your English speaking
                                            </Text>
                                            <Button size="sm" colorScheme="pink">
                                                Go
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Box>
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