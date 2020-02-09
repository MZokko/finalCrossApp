import React, { useState, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button
} from "react-native";
import firebase from "firebase";
import Card from "../Game/components/Card";
import Header from "../Game/components/Header";
import color from "../Game/constants/color";

export default class HallOfFameScreen extends Component {
  render() {
    return (
      <View>
        <Header title="Hall of Fame" />
        <Card>
          <View style={styles.viewList}>
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
    
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  viewList: {
    margin: 20,
    alignItems: "center",
    shadowColor: "black",
    backgroundColor: "white",
    //ios shadoe property
    shadowOffset: { width: 0, hight: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    //android shadow property
    elevation: 5
  }
});
