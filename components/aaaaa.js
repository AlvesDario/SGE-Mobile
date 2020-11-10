import React, { useEffect, useState } from 'react';
import DownloadButton from './atomic_components/downloadButton';
import Status from './atomic_components/status';
import ProgressBar from './atomic_components/progressBar';
import Axios from 'axios';

const App = props => {
  const { docID } = props;
  const [fileData, setFileData] = useState({});

  useEffect(() => {
    const initComponent = async () => {
      let { data } = await Axios.get(`https://jsonbox.io/box_1297d688082dece8e90d/arquivos/${docID}`);
      setFileData(data);
    }
    initComponent();
  }, [props])

  const handleUpload = async () => {
  }

    return <>
        <DownloadButton
      text={fileData.document}
      link={fileData.sampleLink}
      uploadFunction={handleUpload}
        />
    <ProgressBar progressStatus={fileData.progressStatus} currentProgress={fileData.currentProgress} />
    <Status status={fileData.status} notes={fileData.notes} />
    </>
}

export default App;