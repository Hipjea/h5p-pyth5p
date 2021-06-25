import React, { useState, useRef, useEffect } from 'react';
import { decodeHtmlEntities } from '../utils/utils';
import Button from './Button';
import { Preview } from './Preview';
import './snippet.css';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
const Sk = require('skulpt');


function Snippet(props) {
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
    const onChangeChecking = (props.behaviour.onChangeChecking === 'true' || 
                                props.behaviour.onChangeChecking === true);

    useEffect(() => {
        runit(localCode);
    }, [localCode]);

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
        // if (val != undefined && onChangeChecking) {
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

    return (
        <section 
            id={`code-${props.id}`}
            className="h5p-pyth5p-code"
        >
            <AceEditor
                ref={prog}
                mode="python"
                theme="github"
                onChange={ val => onChangeChecking ? runit(val) : setCode(val) }
                defaultValue={defaultVal}
                name="pyth5p-code-editor"
                width="100%"
                setOptions={props.editorOptions}
                editorProps={{ $blockScrolling: true }}
            />
            <Button 
                visible={!onChangeChecking} 
                onLaunchAction={() => runit()} {...props} 
            />
            <Preview ref={ref} out={out} {...props} />
        </section>
    );
}

export default Snippet;