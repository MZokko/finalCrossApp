import React from 'react';
import { View, Text, StyleSheet, Button, Vibration, ToastAndroid } from 'react-native';

const GameOverScreen = props => {


    return (
        <View style={styles.screen}>
            <Text> Game is over</Text>
            <Text>Number was :{props.userNumber}</Text>
            <Text>Number of Round :{props.roundsNumber}</Text>
            <Text>Timer :{props.time}</Text>

            <Button title="New Game" onPress={props.onRestart} color={Colors.primary} />
            <Button title="Save" onPress={()=>{
                //Add to db perso HighScore
                //Add to hall of famew
                //Vibrate 
                Vibration.vibrate();
                //android
                //ToastAndroid.show("Saved success",20000);   
            }}/>
        </View>
    );

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default GameOverScreen;