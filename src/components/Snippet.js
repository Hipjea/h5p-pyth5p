import React, { useContext, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { PythonCodeContext } from '../PythonCodeContext';
import { decodeHtmlEntities } from '../utils/utils';
import Button from './Button';
import { Preview } from './Preview';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
const Sk = require('skulpt');


function Snippet(props) {
    const context = useContext(PythonCodeContext);
    const { customSettings } = context;

    const pre = React.createRef();
    const canvas = React.createRef();
    const ref = {
        pre: pre,
        canvas: canvas
    }

    const prog = useRef(null);

    const defaultVal = decodeHtmlEntities(props.code);
    const [out, setOuttext] = useState([]);
    const [localCode, setCode] = useState(defaultVal);
    const [correction, setCheckCode] = useState(null);
    const [answers, setAnswers] = useState([]);

    const onChangeChecking = (props.behaviour.onChangeChecking === 'true');
    const editorOptions = {
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
    }

    useEffect(() => {
        runit(localCode);
    }, [localCode]);

    function checkCode() {
        console.log("localCode : ", localCode);
        setCheckCode(props.contentType.correction.correctionCode);
        setAnswers(props.contentType.correction.answers);
    };

    function purgePreContent() {
        setOuttext([]);
    }

    function setPreContent(text) {
        setOuttext(old => [...old, text]);
    }

    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }

    
    function runit(val) {
        if (val != undefined && onChangeChecking) {
            checkCode();
        } else {
            purgePreContent();
            const value = val ?? localCode;
            Sk.pre = pre.current;
            Sk.configure({ output: setPreContent, read: builtinRead, __future__: Sk.python3 }); 
            (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = canvas.current;
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
                onChange={ val => onChangeChecking ? runit(val) : setCode(val) }
                defaultValue={defaultVal}
                name="pyth5p-code-editor"
                width="100%"
                setOptions={editorOptions}
                editorProps={{ $blockScrolling: true }}
            />
            <Button visible={!onChangeChecking} action={() => runit()} {...props} />
            <Preview ref={ref} out={out} {...props} />
            <div className="correction">{correction}</div>
            { listAnswers ? <ul>{listAnswers}</ul> : null }
        </section>
    );
}

export default Snippet;