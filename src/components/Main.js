import React, { useState } from 'react';
import Snippet from './Snippet';
import { Preview } from './Preview';
import Footer from './Footer';
import { createMarkup } from '../utils/utils';


export default function Main({id, error, ...props}) {
    const pre = React.createRef();
    const canvas = React.createRef();
    const ref = {
        pre: pre,
        canvas: canvas
    }
    const [userCode, setUserCode] = useState(props.code);
    const [out, setOutText] = useState([]);

    function clearOutCallback() {
        setOutText([]);
    }

    function setUserCodeCallback(code) {
        setUserCode(code);
    }

    function outTextCallback(text) {
        setOutText(old => [...old, text]);
    }

    return (
        <div className="h5p-pyth5p-main">
            <p className="statement" 
               dangerouslySetInnerHTML={createMarkup(props.statement, false)} />
            <div className="h5p-pyth5p-code-wrapper">
                <Snippet
                    ref={ref}
                    id={id}
                    code={props.code}
                    isEditable={props.behaviour.isEditable}
                    checkOnEdit={props.behaviour.checkOnEdit}
                    setUserCode={setUserCodeCallback}
                    setOutText={outTextCallback}
                    clearOutText={clearOutCallback}
                    {...props}
                />
                <Preview 
                    ref={ref} 
                    out={out} 
                    {...props} 
                />
            </div>
            <Footer userCode={userCode} out={out} {...props} />
        </div>
    );
}
