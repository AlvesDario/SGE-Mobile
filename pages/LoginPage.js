import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Modal } from 'react-native';
import { sendGridEmail } from 'react-native-sendgrid'

const API_KEY = 

const App = (props) => {
    const [email, setEmail] = useState('');
    const [verifyCode, setVerifyCode] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
    const [buttonText, setButtonText] = useState('Entrar')
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const generateRandomKey = () => {
        let randomNumber = '' + Math.floor(Math.random() * 999999)
        randomNumber = ('0'.repeat(6 - randomNumber.length)) + randomNumber;
        return randomNumber;
    }

  const sendEmail = () => {
        setButtonText('enviando email...');
        // Enviar o email

        const sendRequest = sendGridEmail(API_KEY, email, 'no-reply@sge-tcc.live', 'Codigo de verificacao SGE', 'seu codigo de acesso e: ' + code)
        sendRequest.then(() => {
            setButtonText('Codigo enviado');
      setModalVisible(true);
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

  return <View style={{ alignItems: "center" }}>
    <Image
      style={styles.logo}
      source={{
        uri:
          'data:image/jpeg;base64,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',
      }}
    />
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Foi enviado um código de verificação para seu e-mail</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <TextInput style={styles.fieldInput} placeholder='Email' placeholderTextColor='black' value={email} onChangeText={e => { setEmail(e); setButtonText('Entrar'); }} />
    {buttonText !== 'Entrar' && <TextInput style={styles.fieldInput} placeholder='Codigo' placeholderTextColor='black' value={verifyCode} onChangeText={e => setVerifyCode(e)} />}
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
  fieldInput: {
    height: 48,
    borderColor: 'black',
    borderRadius: 9,
    borderWidth: 2,
    width: 300,
    padding: 10,
    marginTop: 10
  },
  logo: {
    width: 250,
    height: 150,
    bottom: 20
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
    }
})

export default App;