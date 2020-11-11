import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const NUMBER_OF_STEPS = 5;

const App = props => {
  return <>
    <View
      style={{
        width: '90%',
        paddingLeft: '5%',
        marginTop:10
        // marginTop: 80,
        // height: 800,
        // backgroundColor: '#B0D8D0' 
      }}>
      <View style={{
        backgroundColor: '#656565',
        borderRadius: 5,
        
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19
      }}>
        <View style={{ backgroundColor: "#1B1B1B", width: `${props.currentProgress * 100 / NUMBER_OF_STEPS}%`, height: 60, borderRadius: 5 }}></View>
        <View style={[styles.bola, {left: `${props.currentProgress/NUMBER_OF_STEPS*100-10}%`}]}>
          <Image
            style={[
              styles.image, { transform: [{ rotateZ: "270deg" }] }
            ]}
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/White_Arrow_Down.svg/768px-White_Arrow_Down.svg.png' }}
          />
        </View>
      </View>
    </View>
  </>
}

export default App;

const styles = StyleSheet.create({
  bola: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19
  },
  image: {
    width: 40,
    height: 40
  }
});