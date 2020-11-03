import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import NodeMailer from 'nodemailer'

var transporter = NodeMailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'db004d@outlook.com',
        pass: '135792468Aa'
    }
});

const App = () => {
    const [email, setEmail] = useState('');
    const [verifyCode, setVerifyCode] = useState('')
    // const [validMail, setValidMail] = useState(true);
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

        var mailOptions = {
            from: 'db004d@outlook.com',
            to: email,
            subject: 'Codigo de verificacao SGE',
            text: 'seu codigo de acesso e: ' + code
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // let body = {
        //     "personalizations": [{
        //         "to": [{ "email": email }],
        //         "subject": "Codigo de verificacao SGE"
        //     }],
        //     "from": { "email": "no-reply@sge.fatec.com" },
        //     "content": [{
        //         "type": "text/plain",
        //         "value": "seu codigo de acesso e: " + code
        //     }]
        // }
        // fetch('https://api.sendgrid.com/v3/mail/send', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': 'Bearer ' + API_KEY,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(body),
        // }).then((response) => {
        //     response.json().then((data)=>console.log(data));
        // });

        // Axios.post('https://api.sendgrid.com/v3/mail/send', JSON.stringify({
        //     to: email, // Change to your recipient
        //     from: 'no-reply@sge.fatec.com', // Change to your verified sender
        //     subject: 'Codigo de verificacao SGE',
        //     text: "seu codigo de acesso e: " + codigo
        // }), {
        //     headers: {
        //         'Authorization': 'Bearer ' + API_KEY,
        //         'Content-Type': 'application/json'
        //     }
        // }).then((response) => {
        //     console.log(response);
        //     console.log(codigo)
        // }).catch(error => {
        //     console.log(error)
        // });



        // const verificationEmail = new SendGrid.Email();
        // verificationEmail.addTo("test@sendgrid.com");
        // verificationEmail.setFrom("you@youremail.com");
        // verificationEmail.setSubject("Sending an email with SendGrid is Fun");
        // verificationEmail.setHtml("and easy to do anywhere, even with Node.js");

        // SendGri.send(verificationEmail);

        // sendGridEmail(API_KEY, email, 'no-reply@sge.fatec.com', 'Codigo de verificacao SGE', "seu codigo de acesso e: " + code)
        //     .then((response) => {
        //         console.log(code)
        //         setButtonText('Codigo enviado');
        //         setTimeout(() => {
        //             setButtonText('Verificar codigo')
        //         }, 3000);
        //     }).catch((error) => {
        //         setErrorMessage(error);
        //     });

        // const msg = {
        //     to: email, // Change to your recipient
        //     from: 'no-reply@sge.fatec.com', // Change to your verified sender
        //     subject: 'Codigo de verificacao SGE',
        //     text: "seu codigo de acesso e: " + code
        // }
        // sgMail
        //     .send(msg)
        //     .then(() => {
        //         setButtonText('Codigo enviado');
        //         setTimeout(() => {
        //             setButtonText('Verificar codigo')
        //         }, 3000)
        //         // console.log('Email sent')
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })

        // const params = new URLSearchParams({
        //     apiKey: API_KEY,
        //     from: "no-reply@sge.fatec.com",
        //     fromName: "SGE Login",
        //     to: [email],
        //     bodyText: "seu codigo de acesso e: " + code,
        //     subject: "Codigo de verificacao SGE"
        // });
        // // https://api.elasticemail.com/v2/email/send?&subject=&from=&fromName=&sender=&senderName=&msgFrom=&msgFromName=&replyTo=&replyToName=&to=&msgTo=&msgCC=&msgBcc=&lists=&segments=&mergeSourceFilename=&dataSource=&channel=&bodyHtml=&bodyText=&charset=&charsetBodyHtml=&charsetBodyText=&encodingType=&template=&headers_firstname=firstname: myValueHere&postBack=&merge_firstname=John&timeOffSetMinutes=&poolName=My Custom Pool&isTransactional=false&attachments=&trackOpens=true&trackClicks=true&utmSource=source1&utmMedium=medium1&utmCampaign=campaign1&utmContent=content1&bodyAmp=&charsetBodyAmp=
        // Axios.post(`https://api.elasticemail.com/v2/email/send?${params.toString()}`).then((res) => {
        //     console.log(res.data)
        //     
        // })

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
            if (code === verifyCode)
                console.log(true)
            else
                setErrorMessage('Codigo errado')
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