import React from 'react';
import { ScrollView, View, BackHandler } from 'react-native';
import Aaa from '../components/aaaaa';

const App = () => {

  return <>
    <View>
      <Aaa
        docName="Plano de Atividades"
        docLink="http://www.fatecid.com.br/site/wp-content/uploads/downloads/estagio/PlanodeAtividades.docx"
        progressStatus={true}
        currentProgress={2}
      />
      <Aaa
        docName="Relatório Final"
        docLink="http://www.fatecid.com.br/site/wp-content/uploads/downloads/estagio/RelatorioFinal.docx"
        progressStatus={true}
        currentProgress={4}
      />
    </View>
  </>
}

export default App;