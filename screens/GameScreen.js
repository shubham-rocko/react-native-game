import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/number-container';
import Card from '../components/Card';

const generateNumberInBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNumber = Math.floor(Math.random() * (max-min)) + min;
    if(rndNumber === exclude){
        return generateNumberInBetween(min, max, exclude);
    } else {
        return rndNumber;
    }
}

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(generateNumberInBetween(1, 100, props.userChoice));
    const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if((direction === "lower" && currentGuess < userChoice) || 
            (direction === "greater" && currentGuess > userChoice)) {
                Alert.alert("Don't lie!", "You know that this is wrong...", 
                [{text: 'Sorry!', style: 'cancel'}]);
                return;
            }
        if(direction === "lower"){
            currentHigh.current = currentGuess;
        } else if(direction === "greater") {
            currentLow.current = currentGuess;
        }
        setRounds(rounds => rounds+1);
        const nextNumber = generateNumberInBetween(currentLow.current, currentHigh.current);
        setCurrentGuess(nextNumber);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 250,
        maxWidth: '80%'
    }
});

export default GameScreen;