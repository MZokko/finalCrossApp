import React, { Component } from "react";
import { Text, View, StyleSheet, Button , Image} from "react-native";
import firebase from "firebase";
//game
import color from "../Game/constants/color";
import Header from "../Game/components/Header";

export default class Mainscreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Header title="Main Menu"/>
        <View style={styles.imageConTainer}>

        <Image 
        //source={require('../image/6197_poster.png') } 
        source={{uri:'https://thumb-v-cl2.xhcdn.com/a/i-tkEHZYO5D3oooitQv9CQ/010/178/644/2000x2000.c.jpg.v1537157760'}}
        styles={styles.image} 
        resizeMode ="center"/>

      </View>
    
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
  },

  imageConTainer:{
    width:300,
    height:300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  image : {
    width: '100%',
    height: '100%',
  }
  
});
