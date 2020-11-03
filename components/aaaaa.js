import React, { useState } from 'react';
import DownloadButton from './atomic_components/downloadButton';
import Status from './atomic_components/status';
import ProgressBar from './atomic_components/progressBar';
import { Button } from 'react-native-paper';

const App = props => {
    const [showDetails, setShowDetails] = useState(false);
    const {docName, docLink, progressStatus, currentProgress, status, notes} = props;

    const handleButtonClick = () => {
        setShowDetails(!showDetails);
    }

    return <>
        <DownloadButton 
            text={docName}
            link={docLink}
            onClick={handleButtonClick}
        />
        {showDetails && <>
            <Button></Button><Button></Button>
        </>}
        <ProgressBar progressStatus={progressStatus} currentProgress={currentProgress} />
        <Status status={status} notes={notes} />
    </>
}

export default App;