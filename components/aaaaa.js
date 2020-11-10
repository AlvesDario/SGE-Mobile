import React, { useEffect, useState } from 'react';
import DownloadButton from './atomic_components/downloadButton';
import Status from './atomic_components/status';
import ProgressBar from './atomic_components/progressBar';
import * as DocumentPicker from 'expo-document-picker';
import { readAsStringAsync } from 'expo-file-system';
import Axios from 'axios';
import { Modal, View, TouchableHighlight, Text, StyleSheet, Picker } from 'react-native';

const App = props => {
  const { docID } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [fileData, setFileData] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const [avaliadorList, setAvaliadorList] = useState([]);

  const [avaliadorName, setAvaliador] = props.avaliador;

  useEffect(() => {
    const initComponent = async () => {
      let { data } = await Axios.get(`https://jsonbox.io/box_1297d688082dece8e90d/arquivos/${docID}`);
      setFileData(data);
      console.log('init component')
    }
    initComponent();
  }, [props])

  useEffect(() => {
    if (Array.isArray(avaliadorList) && avaliadorList.length) {
      setModalVisible(true);
    }
  }, [avaliadorList])

  const handleButtonClick = async () => {
    if (!avaliadorName) {
      const { data } = await Axios.get(`https://jsonbox.io/box_1297d688082dece8e90d/avaliadores`);

      setAvaliadorList(await Promise.all(data.map(async element => {
        return element.nome;
      })));
    } else {
      uploadFile();
    }
  }

  const uploadFile = async () => {
    let containerName = fileData.aluno.split('@')[0].replace('.', '');

    DocumentPicker.getDocumentAsync().then((res) => {
      if (res.name) {
        readAsStringAsync(res.uri, { encoding: 'base64' }).then(data => {
          Axios.post('https://sge-backend.herokuapp.com/', {
            containerName: containerName,
            base64File: data,
            fileName: res.name,
            fileLength: res.size
          }).then(d => {
            Axios.put(`https://jsonbox.io/box_1297d688082dece8e90d/arquivos/${docID}`, {
              aluno: fileData.aluno,
              progressStatus: fileData.progressStatus,
              currentProgress: 1,
              link: `https://sgeblobfiles.blob.core.windows.net/${containerName}/${res.name}`,
              status: "Enviado",
              notes: "Aguardando vizualisacao do avaliador",
              document: fileData.document,
              sampleLink: fileData.sampleLink
            }).then((info) => console.log(info))
          }).catch(err => {
            console.log(err);
          })
        })
      }
    });
  }

  const handleConfirm = () => {
    setAvaliador(selectedValue);
    setModalVisible(false);
  }

  return <>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Selecione seu avaliador/disciplina:</Text>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)}
          >
            <Picker.Item label={"selecione"} value={""} />
            {Array.isArray(avaliadorList) && avaliadorList.map((nome, index) => <Picker.Item key={index} label={nome} value={nome} />)}
          </Picker>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#FFF", borderColor: "#000" }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={{ ...styles.textStyle, color: "#000" }}>Cancelar</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#000", borderColor: "#FFF" }}
            onPress={handleConfirm}
          >
            <Text style={{ ...styles.textStyle, color: "#FFF" }}>Confirmar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
    <DownloadButton
      text={fileData.document}
      link={fileData.sampleLink}
      uploadFunction={handleButtonClick}
    />
    <ProgressBar progressStatus={fileData.progressStatus} currentProgress={fileData.currentProgress} />
    <Status status={fileData.status} notes={fileData.notes} />
  </>
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;