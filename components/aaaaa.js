import React from 'react';
import DownloadButton from './atomic_components/downloadButton';
import Status from './atomic_components/status';
import ProgressBar from './atomic_components/progressBar';

const App = props => {
    return <>
        <DownloadButton 
            text={props.docName}
            link={props.docLink}
        />
        <ProgressBar progressStatus={props.progressStatus} currentProgress={props.currentProgress}/>
        <Status />
    </>
}

export default App;