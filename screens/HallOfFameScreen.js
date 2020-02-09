import React, { Component } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import firebase from "firebase";
import Card from "../Game/components/Card";
import Header from "../Game/components/Header";
import color from "../Game/constants/color";
import { ScrollView } from "react-native-gesture-handler";

export default class HallOfFameScreen extends Component {
  state = {
    hallOfFameScore: []
  };
  setupHighscoreListener = () => {
    firebase
      .database()
      .ref("HallOfFame")
      .on("value", snapshot => {
        const fame = snapshot.val();
        const item = Object.values(fame);
        this.setState({ hallOfFameScore: item });
      });
    //console.log("item====",item);
    console.log("state=====", this.state.hallOfFameScore);
    console.log(
      "my object transc==",
      Object.keys(this.state.hallOfFameScore).map(key => ({
        roundsNumber: key.valueOf()
      }))
    );
  };

  render() {
    return (
      <View>
        <Header title="Hall of Fame" />

        <View>
          <Button
            title="LOAD"
            color={color.accent}
            onPress={() => {
              this.setupHighscoreListener();
            }}
          />
          <View>
            <ScrollView>
              {this.state.hallOfFameScore.map(hallOfFameScore => (
                <Card>
                  <Text key={hallOfFameScore.roundsNumber}>
                    {hallOfFameScore.roundsNumber}
                  </Text>
                  <Text key={hallOfFameScore.userNumber}>
                    {hallOfFameScore.userNumber}
                  </Text>
                </Card>
              ))}
            </ScrollView>
          </View>
          {/* {async()=>{
              this.state.hallOfFameScore.forEach(Object.values(this.state.hallOfFameScore) => {
                
              });
            }} */}
          {/* <FlatList
              keyExtractor={item => JSON.stringify(item.firebaseId)}
              data={toDoList}
              renderItem={(taskData, idx) => (
                <TodoItem
                  key={idx}
                  item={taskData.item}
                  onDelete={removeTaskHandler}
                />
              )}
            /> */}
        </View>

        <Button
          title="Menu"
          color={color.primary}
          onPress={() => {
            this.props.navigation.navigate("Main");
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});
