import React from 'react';
import './app.css';
import Main from './Main';

export type AppProps = {
    params: any;
    contentId: any;
    fn: ReturnType<() => {}>;
};

const App: React.FC<AppProps> = ({ params, contentId, fn }) => {
    return <Main id={contentId} fn={fn} {...params} />;
};

export default App;