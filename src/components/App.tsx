import React from 'react';
import './app.css';
import Main from './Main';
import { AppProps } from '../types/App';

const App: React.FC<AppProps> = ({ params, contentId, fn }) => {
    return <Main id={contentId} fn={fn} {...params} />;
};

export default App;