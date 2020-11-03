import React from 'react';
import { Text, StyleSheet } from 'react-native';

const App = props => {
    const { status, notes } = props;
    return <>
        <Text >{status}</Text>
        <Text >{notes}</Text>
    </>
}

export default App;

// const styles = StyleSheet.create({
//     title: {
//         fontFamily: "Roboto",
//         fontStyle: "normal",
//         fontWeight: "bold",
//         fontSize: "18px",
//         lineHeight: "21px",
//         textAlign: "center",

//         color: "#000000"
//     },
//     notes: {
//         font-family: Roboto;
// font-style: normal;
// font-weight: normal;
// font-size: 18px;
// line-height: 21px;
// /* identical to box height */

// text-align: center;
//     },
// });