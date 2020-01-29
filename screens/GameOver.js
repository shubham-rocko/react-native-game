 import React from 'react';
 import { View, Text, StyleSheet, Button, Image } from 'react-native';

 import BodyText from "../components/BodyText";
 import TitleText from "../components/TitleText";
import Colors from '../constants/color';

 const GameOver = (props) => {
     return (
         <View style={styles.screen}>
            <TitleText>Game is Over Now!</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                fadeDuration={1000}
                source={require('../assets/success.png')} 
                // source={{uri: 'https://pixabay.com/photos/landscape-alps-europe-mountains-3725657/'}}
                style={styles.image}
                resizeMode="cover"/>
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds 
                    to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
            </View>
            <Button title="NEW GAME" onPress={props.onRestart} />
         </View>
     );
 }

 const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultContainer: {
        marginHorizontal: 20,
        marginVertical: 15
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        width: '80%',
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    resultText: {
        textAlign: "center",
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
 })
 
 export default GameOver;