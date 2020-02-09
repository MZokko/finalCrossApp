import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button
} from "react-native";
import firebase from "firebase";
import Card from "../Game/components/Card";
import Header from "../Game/components/Header";
import color from "../Game/constants/color";



export default class HallOfFameScreen extends Component {
      setupHighscoreListener=()=>{
        firebase.database().ref('HallOfFame').on('value',(snapshot) => {
            console.log("what u get",snapshot);
          snapshot.forEach(Object => {
              console.log("just the object ?",snapshot.val())
          });
        });}

  render() {
    
    return (
      <View>
        <Header title="Hall of Fame" />
        <Card>
          <View >
              <Button title="try" onPress={()=>{this.setupHighscoreListener()}}/>
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
        </Card>

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
      flex:1,
    },
    container:{
      flex:2,
      alignItems:"center",
      justifyContent:"center",
    }
    
  });
