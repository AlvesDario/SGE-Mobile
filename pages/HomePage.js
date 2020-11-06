import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Aaa from '../components/aaaaa';
import Axios from 'axios';

const App = props => {
  const [logedIn, setLogedIn] = useState('');
  const [Docs, setDocs] = useState([]);

  let USER_FILES = `https://jsonbox.io/box_1297d688082dece8e90d/arquivos?q=aluno:${props.Login}`;

  const addFile = (document, sampleLink) => {
    return {
      aluno: props.Login,
      progressStatus: true,
      currentProgress: 0,
      link: '',
      status: 'Entrega Pendente',
      notes: 'Aguardando envio do documento',
      document: document,
      sampleLink: sampleLink || null
    }
  }

  useEffect(() => {
    Axios.get(USER_FILES).then(({ data }) => {
      console.log(data);
      if (Array.isArray(data) && data.length) {
        setDocs(data.arquivos);
      }
      else {
        setDocs([
          addFile('Contrato de Estagio'),
          addFile('Plano de Atividades', 'http://www.fatecid.com.br/site/wp-content/uploads/downloads/estagio/PlanodeAtividades.docx'),
          addFile('Relatorio Final', 'http://www.fatecid.com.br/site/wp-content/uploads/downloads/estagio/RelatorioFinal.docx')
        ]);
        // await Axios.post('https://jsonbox.io/box_1297d688082dece8e90d/arquivos', addFile('Contrato de Estagio'));
        // await Axios.post('https://jsonbox.io/box_1297d688082dece8e90d/arquivos', addFile('Plano de Atividades', 'http://www.fatecid.com.br/site/wp-content/uploads/downloads/estagio/PlanodeAtividades.docx'));
        // await Axios.post('https://jsonbox.io/box_1297d688082dece8e90d/arquivos', addFile('Relatorio Final', 'http://www.fatecid.com.br/site/wp-content/uploads/downloads/estagio/RelatorioFinal.docx'));
      }
    })
  }, [props])

  return <>
    <View style={{ alignItems: "center" }}>
      {Docs.map((doc, index) => <Aaa key={index}
        document={doc.document}
        sampleLink={doc.sampleLink}
        progressStatus={doc.progressStatus}
        currentProgress={doc.currentProgress}
        status={doc.status}
        notes={doc.notes}
      />)}
    </View>

  </>
}

export default App;