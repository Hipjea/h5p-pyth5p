import React, { useState } from 'react';
import Snippet from './Snippet';
import { Preview } from './Preview';
import Footer from './Footer';
import { createMarkup } from '../utils/utils';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import Button from './Button';
import { decodeHtmlEntities } from '../utils/utils';
const Sk = require('skulpt');


export default function Main({id, error, ...props}) {
    const codeeditor = React.createRef();
    const pre = React.createRef();
    const canvas = React.createRef();
    const ref = {
        codeeditor: codeeditor,
        pre: pre,
        canvas: canvas
    }
    const [userCode, setUserCode] = useState(props.code);
    const [out, setOutText] = useState([]);
    const defaultVal = decodeHtmlEntities(props.code);
    const [localCode, setCode] = useState(defaultVal);

    function clearOutText() {
        setOutText([]);
    }

    function outTextCallback(text) {
        setOutText(rest => [...rest, text]);
    }

    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }

    function runCode(val) {
        const value = val ?? localCode;
        clearOutText();
        setUserCode(value);

        Sk.pre = pre.current;
        Sk.configure({ output: outTextCallback, read: builtinRead, __future__: Sk.python3 }); 
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = canvas.current;
        const SkPromise = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, value, true);
        });
        SkPromise.then(function(_) {
        },
        function(err) {
            console.error(err.toString());
            setOutText(err.toString())
        });
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
                    setCode={setCode}
                    {...props}
                />
                <Button onLaunchAction={() => runCode()} {...props} />
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
