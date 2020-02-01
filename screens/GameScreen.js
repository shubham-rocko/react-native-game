import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/number-container';
import Card from '../components/Card';
import ManiButton from '../components/MainButton';
import BodyText from "../components/BodyText";

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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = (props) => {
    const initialGuess = generateNumberInBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    // const [rounds, setRounds] = useState(0);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
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
        // setRounds(rounds => rounds+1);
        const nextNumber = generateNumberInBetween(currentLow.current, currentHigh.current);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuess => [nextNumber.toString(), ...curPastGuess]);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <ManiButton  onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color="white" />
                </ManiButton>
                <ManiButton  onPress={nextGuessHandler.bind(this, 'greater')} >
                <Ionicons name="md-add" size={24} color="white" />
                </ManiButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => (
                        renderListItem(guess, pastGuesses.length - index)
                    ))}
                </ScrollView> */}
                <FlatList contentContainerStyle={styles.list}
                keyExtractor={(item => item)} 
                data={pastGuesses} 
                renderItem={renderListItem.bind(this, pastGuesses.length)}></FlatList>
            </View>
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
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        width: '60%',
        flex: 1
    },
    list: {
        // alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%"
    }
});

export default GameScreen;