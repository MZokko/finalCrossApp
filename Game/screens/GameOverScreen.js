import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Vibration,
  ToastAndroid
} from "react-native";
import Colors from "../constants/color";
import Card from "../components/Card";
import firebase from "firebase";
import HallOfFame from "./HallOfFameScreen";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Card>
        <Text> Game is over</Text>
        <Text>Number was :{props.userNumber}</Text>
        <Text>Number of Round :{props.roundsNumber}</Text>
        {/* <Text>Timer :{props.time}</Text> */}
      </Card>

      <View style={styles.btnContainer}>
        <Button
          title="New Game"
          onPress={props.onRestart}
          color={Colors.accent}
        />
        <Button
          title="Save"
          color={Colors.primary}
          onPress={() => {
            //Add to db perso HighScore
            //Add to hall of famew
            firebase
              .database()
              .ref("HallOfFame") //locarion
              .push() //weird auto key
              .set({
                userNumber: props.userNumber,
                roundsNumber: props.roundsNumber
                //   userName:firebase.auth().g
              }); //gameover screen info

            //Vibrate
            Vibration.vibrate();
            //android
            //ToastAndroid.show("Saved success",20000);
          }}
        />
      </View>

      {/* <View>
      <Button
          title="Sign out"
          onPress={() => {
            firebase
            .auth()
            .signOut()
            .then(()=>navigation.navigate("Login"))
            .catch(e => console.log(e));}}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  }
});

export default GameOverScreen;
