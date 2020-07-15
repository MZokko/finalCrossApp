import React, { useState, useRef, useEffect, Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Timer from "../components/Timer";
import MainBtn from "../components/MainBtn";
import { Ionicons } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  if (randNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randNum;
  }
};

const renderListItem = (value, nbOfRound) => (
  <View key={value} style={styles.listItem}>
    <Text>#{nbOfRound}</Text>
    <Text>{value}</Text>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuess, setpastGuess] = useState([initialGuess]);
  //timer
  const [myTimer, setMyTimer] = useState(0);

  //useRef will survive the rerendering of this component
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  //array destructuring to put the props in a constant of their own name
  const { userChoice, onGameOver } = props;

  let timer;

  //useEffect allow to use logic after every cycle
  //Page_Load
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuess.length);
    }
  }, [currentGuess, userChoice, onGameOver, Timer]);

  const nextGameHandler = (direction, myTimer) => {
    setMyTimer(myTimer);
    console.log(
      "myTimer==============:",
      timer,
      new Date().getMilliseconds() + "ms"
    );
    //incorect hint
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie !", "You know this is wrong...", [
        { text: "my Bad", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setpastGuess((curPastGuest) => [nextNumber, ...curPastGuest]);
  };

  const getCurrentTime = (time) => {
    console.log("time:", time, new Date().getMilliseconds() + "ms");
    timer = time;
    setMyTimer(time);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <Card style={styles.TimerWapper}>
        {/* ------------------------------- */}
        <Timer setTime={getCurrentTime} />
      </Card>

      <NumberContainer>{currentGuess}</NumberContainer>

      <Card style={styles.btnContainer}>
        <MainBtn onPress={nextGameHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainBtn>
        <MainBtn onPress={nextGameHandler.bind(this, "higher")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainBtn>
        {/* <Button title="LOWER" onPress={nextGameHandler.bind(this, "lower")} />
        <Button title="HIGHER" onPress={nextGameHandler.bind(this, "higher")} /> */}
      </Card>

      <View style={styles.list}>
        <ScrollView contentContainerStyle={styles.listScroll}>
          {pastGuess.map((guess) => renderListItem(guess))}
        </ScrollView>
      </View>
        
      

    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "90%",
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  list: {
    width: "80%",
    flex:1,
  },
  listScroll:{
    flexGrow:1,
    alignContent:'center',
    justifyContent:'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

export default GameScreen;
