import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import firebase from "firebase";
//game
import color from "../Game/constants/color";
import Header from "../Game/components/Header";

export default class Mainscreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Header title="Main Menu"/>
    
        <View style={styles.container}>
        <Button
              title="Start Game"
              color={color.primary}
              onPress={() => {
                console.log("YES U PRESS");
                this.props.navigation.navigate("Game");
              }}
            />
        <Button
              title="Hall of Fame"
              color={color.accent}
              onPress={() => {
                this.props.navigation.navigate("Fame");
              }}
            />

            <Button
              title="Sign out"
              color={color.primary}
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(this.props.navigation.navigate("Login"))
                  .catch(e => console.log(e));
              }}
            />
        </View>
            {/* onPress={this.props.navigation.navigate("Game")} */}
            

            
          </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex:1,
  },
  container:{
    flex:2,
    alignItems:"center",
    justifyContent:"center",
  }
  
});
