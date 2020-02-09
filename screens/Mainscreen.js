
import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import firebase from 'firebase';
//game
import GameApp from '../Game/GameApp';

export default class Mainscreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        
        <Button title="Start Game" onPress={this.props.navigation.navigate("Game")}/>
        <Button title="Hall of Fame"/>
        <Button
          title="Sign out"
          onPress={() => {
            firebase
            .auth()
            .signOut()
            .then(this.props.navigation.navigate("Login"))
            .catch(e => console.log(e));}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});