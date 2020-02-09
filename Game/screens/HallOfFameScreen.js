import React from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

const HallOfFame = props=>{ 

    return(
        <View>
            <Text> hall of fame</Text>
            <Button title="New Game" onPress={props.onRestart} />
        </View>
    );
    
};

const styles = StyleSheet.create({

});

export default HallOfFame;