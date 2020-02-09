import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
//component
import Header from './components/Header';
//screens
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


export default function GameApp() {

  const [userNumber, setUserNumber] = useState(0);
  const [guessRound, setGuessRound] = useState(0);


  const HallOfFameHandler = (boolean) => {
    setGoHallOfFame(boolean);
  };

  const configureNewGameHandler = () => {

    setGuessRound(0);
    setUserNumber(null);
  };

  const StartGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (nbOfRound, time) => {
    setGuessRound(nbOfRound);
  };

  let content = <StartGameScreen onStartGame={StartGameHandler}  />;

    if (userNumber && guessRound <= 0) {
      content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
    } else if (guessRound > 0) {
      content = <GameOverScreen roundsNumber={guessRound} userNumber={userNumber} onRestart={configureNewGameHandler} onHallOfFame={HallOfFameHandler}/>;
    }

  return (
    <View style={styles.screen}>

      <Header title="Guess a number" />

      {content}

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
