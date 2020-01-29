import React, { Component, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import * as Google from "expo-google-app-auth";
import firebase from 'firebase';

const IOS_CLIENT_ID =
  "903523458890-sshjf93gsetfrbqnqc3r832dmhv5le95.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "903523458890-ck1nm616us5le0fjj0lec454avq7gppk.apps.googleusercontent.com";

  // const isUserEqualGoogle = (googleUser, firebaseUser) => {
  //   if (firebaseUser) {
  //     const { providerData } = firebaseUser;
  //     for (let i = 0; i < providerData.length; i++) {
  //       if (
  //         providerData[i].providerId ===
  //           firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
  //         providerData[i].uid === googleUser.getBasicProfile().getId()
  //       ) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // };
  var provider = new firebase.auth.GoogleAuthProvider();

export default class Loginscreen extends Component {


  // isUserEqual=(googleUser, firebaseUser)=> {
  //   if (firebaseUser) {
  //     var providerData = firebaseUser.providerData;
  //     for (var i = 0; i < providerData.length; i++) {
  //       if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
  //           providerData[i].uid === googleUser.getBasicProfile().getId()) {
  //         // We don't need to reauth the Firebase connection.
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }

  //  onSignIn =(googleUser)=> {
  //   console.log('Google Auth Response', googleUser);
  //   // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  //   const unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
  //     unsubscribe();
  //     // Check if we are already signed-in Firebase with the correct user.
  //     if (!isUserEqualGoogle(googleUser, firebaseUser)) {
  //       // Build Firebase credential with the Google ID token.
  //       const credential = firebase.auth.GoogleAuthProvider.credential(
  //           googleUser.idToken,
  //           googleUser.accessToken);
  //           console.log('========CREDENTIAL==============',credential);
  //       // Sign in with credential from the Google user.
  //       firebase
  //       .auth()
  //       .signInWithCredential(credential)
  //       .then((result)=>{
  //         console.log('user sign in');
  //         firebase
  //         .database()
  //         .ref(`users/${result.user.uid}`)
  //         .set({
  //           gmail : result.user.email,
  //           profile_picture_URL : result.user.photoURL,
  //           user_Name: result.additionalUserInfo.username,
  //         }).then((snapshot)=>{
  //           //console.log('Snapshot', snapshot);
  //         });
  //       })
  //       .catch(function(error) {
          
  //         // Handle Errors here.
  //         var errorCode = error.code;
  //         var errorMessage = error.message;
  //         // The email of the user's account used.
  //         var email = error.email;
  //         // The firebase.auth.AuthCredential type that was used.
  //         var credential = error.credential;
  //         // ...
  //         console.log('Here we are ============',error,'\n  message',error.message,'\n code  ',error.code,'\n  credential',error.credential);
  //       });
  //     } else {
  //       console.log('User already signed-in Firebase.');
  //     }
  //   }.bind(this));
  // }




  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        
        console.log("Loginscreen.js.js 88 | ", result.user);
        this.props.navigation.navigate("Profile", {
          username: result.user.givenName
        }); 
        //after Google login redirect to Profile
        //this.onSignIn(result);

        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log('WAaaaaaaazaaaaaaaa', user,token);
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log('errorCode==========',errorCode,
          '\n errorMessage============',errorMessage,
          '\n email==================',email,
          '\n credential==============',credential)
        });
        this.props.navigation.navigate('Main');
        return result.accessToken;
        
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('Loginscreen.js.js 101 | Error with login', e);
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login with Google" onPress={this.signInWithGoogle} />
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