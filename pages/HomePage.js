import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Aaa from '../components/aaaaa';
import Axios from 'axios';

const App = props => {
  const [logedIn, setLogedIn] = useState('');
  const [Docs, setDocs] = useState([]);

  useEffect(() => {
    Axios.get(`https://jsonbox.io/box_1297d688082dece8e90d/?q=aluno:${props.Login}`).then(({ data }) => {
      setDocs(data.arquivos);
      console.log(data);
    })
  }, [props])


  return <>
    <View style={{ alignItems: "center" }}>
      {Docs.map((doc, index) => <Aaa key={index}
        docName={doc.documento}
        docLink="http://www.fatecid.com.br/site/wp-content/uploads/downloads/estagio/PlanodeAtividades.docx"
        progressStatus={doc.progressStatus}
        currentProgress={doc.currentProgress}
        status={doc.status}
        notes={doc.notes}
      />)}
    </View>

  </>
}

export default App;