import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import color from "../Game/constants/color";

import * as Google from "expo-google-app-auth";
import firebase from "firebase";

const IOS_CLIENT_ID =
  "903523458890-sshjf93gsetfrbqnqc3r832dmhv5le95.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "903523458890-ck1nm616us5le0fjj0lec454avq7gppk.apps.googleusercontent.com";

var provider = new firebase.auth.GoogleAuthProvider();

export default class Loginscreen extends Component {
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log("Loginscreen.js.js 88 | ", result.user);
        //add db
        firebase
          .database()
          .ref(`users/${result.user.id}`)
          .set({
            gmail: result.user.email,
            user_givenName: result.user.name
          })
          .then(snapshot => {
            //console.log('Snapshot', snapshot);
          });

        //end add
        this.props.navigation.navigate("Profile", {
          username: result.user.givenName
        });
        //after Google login redirect to Profile
        //this.onSignIn(result);

        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log("WAaaaaaaazaaaaaaaa", user, token);
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(
              "errorCode==========",
              errorCode,
              "\n errorMessage============",
              errorMessage,
              "\n email==================",
              email,
              "\n credential==============",
              credential
            );
          });
        this.props.navigation.navigate("Main");
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("Loginscreen.js.js 101 | Error with login", e);
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Login with Google"
          color={color.accent}
          onPress={this.signInWithGoogle}
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
