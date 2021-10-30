import React, { useContext, useEffect } from 'react';
import './app.css';
import { AppContext } from '../components/Context';
import Main from './Main';
import { AppProps } from '../types/App';


const App: React.FC<AppProps> = ({ params, contentId, trigger, createXAPIEventTemplate }) => {
    const { setId, setTrigger, setXAPIEventTemplate } = useContext(AppContext);

    useEffect(() => {
        setId(contentId);
        setTrigger(trigger);
        setXAPIEventTemplate(createXAPIEventTemplate);
    }, []);

    return <Main {...params} />;
};

export default App;
