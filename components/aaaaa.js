import React, { useState } from 'react';
import DownloadButton from './atomic_components/downloadButton';
import Status from './atomic_components/status';
import ProgressBar from './atomic_components/progressBar';

const App = props => {
    const { document, sampleLink, progressStatus, currentProgress, status, notes } = props;

    return <>
        <DownloadButton
            text={document}
            link={sampleLink}
            uploadFunction={()=>{console.log('file uploaded successfully!')}}
        />
        <ProgressBar progressStatus={progressStatus} currentProgress={currentProgress} />
        <Status status={status} notes={notes} />
    </>
}

export default App;