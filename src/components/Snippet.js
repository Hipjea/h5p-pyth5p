import React, { useContext, useState, useRef, useEffect }from 'react';
import { PythonCodeContext } from '../PythonCodeContext';
import { decodeHtmlEntities } from '../utils';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
const Sk = require('skulpt');


function Snippet(props) {
    const context = useContext(PythonCodeContext);
    const { customSettings } = context;

    const prog = useRef(null);
    const pre = useRef(null);
    const defaultVal = decodeHtmlEntities(props.code);
    const [out, setOuttext] = useState(0);
    const [localCode, setCode] = useState(defaultVal);

    useEffect(() => {
        runit(localCode),
        [localCode]
    });

    function setPreContent(text) {
        setOuttext(text);
    }

    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }

    function runit(val) {
        const value = val ?? out;
        setCode(value);
        Sk.pre = pre.current;
        Sk.configure({ output: setPreContent, read: builtinRead }); 
        var myPromise = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, value, true);
        });
        myPromise.then(function(mod) {
            console.log('success');
        },
        function(err) {
            console.log(err.toString());
            setPreContent(err.toString())
        });
    }

    return (
        <section 
            id={`code-${props.id}`}
            className={"h5p-pyth5p-code"}
        >
            <AceEditor
                ref={prog}
                mode="python"
                theme="github"
                onChange={val => runit(val)}
                defaultValue={defaultVal}
                name="UNIQUE_ID_OF_DIV"
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    tabSize: 4,
                    fontSize: 13,
                    showGutter: true,
                    readOnly: false,
                    behavioursEnabled: true,
                    wrapBehavioursEnabled: true,
                    maxLines: "Infinity",
                    fontFamily: customSettings.codeFont
                }}
                editorProps={{ $blockScrolling: true }}
            />
            
            <button role="button" className="joubel-simple-rounded-button" onClick={() => runit()}>Check</button>
            <pre ref={pre}>{out}</pre>
        </section>
    );
}

export default Snippet;