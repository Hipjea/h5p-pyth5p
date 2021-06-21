import React, { useContext, useState, useRef, useEffect }from 'react';
import { PythonCodeContext } from '../PythonCodeContext';
import { decodeHtmlEntities } from '../utils/utils';
import { showCheckButton } from '../utils/buttons'

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
    const [correction, setCheckCode] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        runit(localCode, "init")
    }, [localCode]);

    function checkCode() {
        setCheckCode(props.contentType.correction.correctionCode);
        setAnswers(props.contentType.correction.answers);
    };

    function setPreContent(text) {
        setOuttext(text);
    }

    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }

    
    function runit(val, cycle) {
        if (cycle != "init") {
            checkCode();
        }

        const value = val ?? out;
        setCode(value);
        Sk.pre = pre.current;
        Sk.configure({ output: setPreContent, read: builtinRead }); 
        const SkPromise = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, value, true);
        });
        SkPromise.then(function(mod) {
            console.log('success');
        },
        function(err) {
            console.log(err.toString());
            setPreContent(err.toString())
        });
    }

    const listAnswers = answers.map((answer, i) => <li key={i}>{answer.text}</li>);

    return (
        <section 
            id={`code-${props.id}`}
            className={"h5p-pyth5p-code"}
        >
            <AceEditor
                ref={prog}
                mode="python"
                theme="github"
                onChange={ val => props.behaviour.onChangeChecking ? runit(val) : setCode(val) }
                defaultValue={defaultVal}
                name="pyth5p-code-editor"
                width="100%"
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    tabSize: 4,
                    fontSize: 13,
                    showGutter: true,
                    readOnly: props.isEditable ? true : false,
                    behavioursEnabled: true,
                    wrapBehavioursEnabled: true,
                    maxLines: "Infinity",
                    minLines: 5,
                    fontFamily: customSettings.codeFont
                }}
                editorProps={{ $blockScrolling: true }}
            />
            
            <pre id="pyth5p-pre" ref={pre}>{out}</pre>

            { props.behaviour.onChangeChecking == false
                ? <button role="button" className="" onClick={() => runit()}><i className="fa fa-play"></i></button>
                : null
            }

            <div className="correction">{correction}</div>

            { listAnswers ? <ul>{listAnswers}</ul> : null }
        </section>
    );
}

export default Snippet;