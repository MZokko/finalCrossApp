import React, { useState, useRef, useEffect, Component } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Timer from '../components/Timer';

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




const GameScreen = props => {
    
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));    
    const [rounds, setRounds] = useState(0);
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

            props.onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGameHandler = (direction, myTimer) => {

        setMyTimer(myTimer);
        console.log('myTimer==============:', timer, new Date().getMilliseconds()+'ms');
        //incorect hint
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie !',
                'You know this is wrong...',
                [{ text: 'my Bad', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(currentRounds => currentRounds + 1);
    };

    const getCurrentTime = time => {
        console.log('time:', time, new Date().getMilliseconds()+'ms')

        setMyTimer(time);
        timer = time;

        

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
                <Button title="LOWER" onPress={nextGameHandler.bind(this, 'lower')} />
                <Button title="HIGHER" onPress={nextGameHandler.bind(this, 'higher')} />

            </Card>

        </View>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    }
});

export default GameScreen;