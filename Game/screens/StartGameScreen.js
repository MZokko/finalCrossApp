import React from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/color';
import MainBtn from '../components/MainBtn';
import { useState } from 'react';

const StartGameScreen = props => {

    //validation input 

    const [enteredValue, setEnteredValue] = useState('');

    const [confirmed, setConfirmed] = useState(false);

    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));//make sure user cant enter anything else than a number
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
            return;
        }

        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text>You selected </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainBtn title="Start Game" onPress={()=>props.onStartGame(selectedNumber)}>START GAME</MainBtn>

            </Card>
    }

    

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>

                <Text style={styles.title}>start game</Text>

                <Card style={styles.inputContainer}>
                    <Text>Select a number</Text>

                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue} />

                    <View style={styles.btnContainer}>
                        <View style={styles.btn}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
                        <View style={styles.btn}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmedOutput}
                
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({

    summaryContainer: {
        marginTop: 20,
        alignItems:'center',

    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    btn: {
        width: 100,
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    btnContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    }

});

export default StartGameScreen;