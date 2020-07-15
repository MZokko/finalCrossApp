import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/color";
import color from "../constants/color";

const MainBtn = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.btnView}>
        <Text style={styles.btnText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnView: {
    backgroundColor: color.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius:25,
  },
  btnText: {
    color: "white",
    // fontFamily:'open-sans',
    fontSize: 18,
  },
});

export default MainBtn;
