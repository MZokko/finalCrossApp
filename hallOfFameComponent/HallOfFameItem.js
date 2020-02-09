import React, { useState, Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import firebase from "firebase";
import { render } from "react-dom";
import Card from "../Game/components/Card";

const HallOfFameItem = props => {
    const [HallofFame,setHallofFame]=useState([]);
  let hallofFameScore = firebase.database().ref("HallOfFame");

  function setupHighscoreListener() {
    firebase.database().on('HallOfFame', (snapshot) => {
      const highscore = snapshot.val().highscore;
      console.log("New high score: " + highscore);
    });
  }
  return (

      <Card>
        <Text>Number Selected :{roundsNumber}</Text>
        <Text>Number of Round:{userNumber}</Text>
      </Card>

  );
};

const styles = StyleSheet.create({});

export default HallOfFameItem;
