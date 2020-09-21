import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';


const App = props => {
  const handleClick = () => {
    if (props.link) {
      Linking.openURL(props.link);
    }
  }

  return <>
    <TouchableOpacity style={styles.button} onPress={handleClick}>
      <Text style={styles.buttonText}>
        {props.text}
      </Text>
    </TouchableOpacity>
  </>;
}

export default App;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#154664",
    height: 42,
    width: 200,
    borderRadius: 6
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
  }
})