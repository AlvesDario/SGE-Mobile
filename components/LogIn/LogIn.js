import React, { useState } from 'react';
import { Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-paper';

const LogIn = props => {
    const [text, setText] = useState('');

    const handleClick = () => {

    }

    return <>
        <TextInput value={text} onChange={(e) => { setText(e.target.value) }} />
        <TouchableOpacity onPress={() => props.onClick(text)}>
            <Text>Log In</Text>
        </TouchableOpacity>
    </>

}
export default LogIn;