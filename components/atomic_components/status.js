import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const App = props => {
    const { status, notes } = props;
    return <View style={styles.container}>
        <Text style={styles.title}>{status}</Text>
        <Text style={styles.notes}>{notes}</Text>
    </View>
}

export default App;

const styles = StyleSheet.create({
    container: {
        marginTop:10
    },
    title: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: 21,
        textAlign: "center",

        color: "#000000"
    },
    notes: {
    },
});