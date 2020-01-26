import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { WebView } from 'react-native-webview';

import Header from './components/header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRound(0); 
  }

  const gameOverHandler = (numRounds) => {
    setGuessRound(numRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if(userNumber && guessRound <= 0 ){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if(guessRound > 0){
    content = <GameOver />
  }

  return (
    <View style={styles.screen}>
        <Header title="Guess a Number"  />
        <WebView
        originWhitelist={['*']}
        source={{html: '<h1>Hello world</h1>'}}
        />
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});
