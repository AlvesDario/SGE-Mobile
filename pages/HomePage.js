import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Aaa from '../components/aaaaa';
import Axios from 'axios';

const App = props => {
  const [userFiles, setUserFiles] = useState({});

  let USER_FILES = `https://jsonbox.io/box_1297d688082dece8e90d/alunos?q=email:${props.Login}`;

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
    const initUser = async () => {
      const user = await Axios.get(USER_FILES).then(async ({ data: userData }) => {
        if (Array.isArray(userData) && userData.length) {
          setUserFiles(userData[0]);
          return userData[0];
        } else {
          return Axios.post('https://jsonbox.io/box_1297d688082dece8e90d/alunos', {
            email: props.Login,
            nome: props.Login.split('@')[0].replace('.', ''),
            arquivos: [],
            avaliador: ''
          }).then(({ data }) => {
            setUserFiles(data);
            return data;
          });
        }
      })

      if (!Array.isArray(user.arquivos) || !user.arquivos.length) { // se o aluno ja enviou documentos
        let docs = [
          addFile('Contrato de Estagio'),
          addFile('Plano de Atividades', 'http://www.fatecid.com.br/site/wp-content/uploads/downloads/estagio/PlanodeAtividades.docx'),
          addFile('Relatorio Final', 'http://www.fatecid.com.br/site/wp-content/uploads/downloads/estagio/RelatorioFinal.docx')
        ];
        let docsID = await Promise.all(docs.map(async doc => {
          let docSent = await Axios.post('https://jsonbox.io/box_1297d688082dece8e90d/arquivos', doc);
          console.log(docSent.data, " dentro do loop");
          return(docSent.data._id);
        }))
        console.log(docsID, " fora do loop")
        Axios.put(`https://jsonbox.io/box_1297d688082dece8e90d/aluno/${user._id}`, {
          nome: user.nome,
          avaliador: user.avaliador,
          email: user.email,
          arquivos: docsID
        });
      }
    }
    initUser();
  }, [props, setUserFiles])

  return <>
    <View style={{ alignItems: "center" }}>
      {Array.isArray(userFiles.arquivos) && userFiles.arquivos.map((doc) => <Aaa key={doc}
        docID={doc}
      />)}
    </View>

  </>
}

export default App;