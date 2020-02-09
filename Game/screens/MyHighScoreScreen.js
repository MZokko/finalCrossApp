import React from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

const MyHighScoreScreen = props=>{ 

    return(
        <View>
            <Text> my highscore</Text>
            <Button title="New Game" onPress={props.onRestart} />
        </View>
    );
    
};

const styles = StyleSheet.create({

});

export default MyHighScoreScreen;