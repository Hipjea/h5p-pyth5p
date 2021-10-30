import React from 'react';
import './app.css';
import AppProvider from './Context';
import Main from './Main';
import { AppProps } from '../types/App';


const App: React.FC<AppProps> = ({ params, contentId, fn }) => {
    return (
        <AppProvider>
            <Main id={contentId} fn={fn} {...params} />
        </AppProvider>
    );
};

export default App;
