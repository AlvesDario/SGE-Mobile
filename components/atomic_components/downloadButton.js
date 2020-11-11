import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Linking, View } from 'react-native';

const App = props => {
  const [showDetails, setShowDetails] = useState(false);

  const DownloadAndUpload = (downloadLink, uploadFunction) => {
    if (downloadLink)
      return <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.smallButton} onPress={downloadClick}><Text style={styles.buttonText} >download</Text></TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={uploadFunction}><Text style={styles.buttonText} >upload</Text></TouchableOpacity>
      </View>
    return <>
      <TouchableOpacity style={styles.smallButton} onPress={uploadFunction}><Text style={styles.buttonText} >upload</Text></TouchableOpacity>
    </>
  }

  const downloadClick = () => {
    if (props.link) {
      Linking.openURL(props.link);
    }
  }

  const handleButtonClick = () => {
    setShowDetails(!showDetails);
  }

  return <>
    <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
      <Text style={styles.buttonText}>
        {props.text}
      </Text>
    </TouchableOpacity>
    {showDetails && DownloadAndUpload(props.link, props.uploadFunction)}
  </>;
}

export default App;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#0C0B0B",
    height: 48,
    width: 200,
    borderRadius: 6,
    borderColor: '#FFF',
    borderWidth: 2
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
  },
  smallButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#0C0B0B",
    height: 42,
    width: 100,
    borderRadius: 6,
    borderColor: '#FFF',
    borderWidth: 2
  }
})