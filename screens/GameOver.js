 import React from 'react';
 import { View, StyleSheet, Button, Image } from 'react-native';

 import BodyText from "../components/BodyText";
 import TitleText from "../components/TitleText";

 const GameOver = (props) => {
     return (
         <View style={styles.screen}>
            <TitleText>Game is Over Now!</TitleText>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/success.png')} 
                style={styles.image}
                resizeMode="cover"/>
            </View>
            <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
            <BodyText>User Number: {props.userNumber}</BodyText>
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
    }
 })
 
 export default GameOver;