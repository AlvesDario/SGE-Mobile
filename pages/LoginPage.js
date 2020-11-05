import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { sendGridEmail } from 'react-native-sendgrid'

const API_KEY = 

const App = (props) => {
    const [email, setEmail] = useState('');
    const [verifyCode, setVerifyCode] = useState('')

    const [buttonText, setButtonText] = useState('Entrar')
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const generateRandomKey = () => {
        let randomNumber = '' + Math.floor(Math.random() * 999999)
        randomNumber = ('0'.repeat(6 - randomNumber.length)) + randomNumber;
        return randomNumber;
    }

    const sendEmail = (codigo) => {
        setButtonText('enviando email...');
        // Enviar o email

        const sendRequest = sendGridEmail(API_KEY, email, 'no-reply@sge-tcc.live', 'Codigo de verificacao SGE', 'seu codigo de acesso e: ' + code)
        sendRequest.then(() => {
            setButtonText('Codigo enviado');
            setTimeout(() => {
                setButtonText('Verificar codigo')
            }, 3000)
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        setCode(generateRandomKey());
    }, [email])

    const handleSubmit = () => {
        if (!email.toUpperCase().includes('@FATEC.SP.GOV.BR'))
            return setErrorMessage('Precisa ser um email @fatec.sp.gov.br');

        setErrorMessage('');

        if (buttonText === 'Entrar')
            return sendEmail(code);

        if (buttonText === 'Verificar codigo') {
            if (code === verifyCode) {
                AsyncStorage.setItem('logedInWith', email).then(() => {
                props.onLogin(email);
                })
            }
            else
                setErrorMessage('Codigo errado');
        }

    }

    return <View >
        <TextInput label='Email' value={email} onChangeText={e => { setEmail(e); setButtonText('Entrar'); }} />
        {buttonText !== 'Entrar' && <TextInput label='Codigo' value={verifyCode} onChangeText={e => setVerifyCode(e)} />}
        <Text>{errorMessage}</Text>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText} >{buttonText}</Text>
        </TouchableOpacity>
    </View>
}

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

export default App;