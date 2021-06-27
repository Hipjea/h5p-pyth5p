import React, { useState, useRef, useEffect } from 'react';
import { decodeHtmlEntities } from '../utils/utils';
import Button from './Button';
import './snippet.css';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
const Sk = require('skulpt');
import PropTypes from 'prop-types';


export const Snippet = React.forwardRef(({id, code, isEditable, checkOnEdit, setOutText, clearOutText, ...props}, ref) => {
    const { pre, canvas } = ref;
    const prog = useRef(null);
    const defaultVal = decodeHtmlEntities(code);
    const [localCode, setCode] = useState(defaultVal);
    const onChangeCheck = (checkOnEdit === 'true' || checkOnEdit === true);

    useEffect(() => {
        runit(localCode);
    }, [localCode]);

    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }

    function runit(val) {
        // if (val != undefined && onChangeCheck) {
        clearOutText();
        const value = val ?? localCode;
        Sk.pre = pre.current;
        Sk.configure({ output: setOutText, read: builtinRead, __future__: Sk.python3 }); 
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = canvas.current;
        const SkPromise = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, value, true);
        });
        SkPromise.then(function(mod) {
            console.log('success');
        },
        function(err) {
            console.log(err.toString());
            setOutText(err.toString())
        });
    }

    return (
        <section 
            id={`code-${id}`}
            className="h5p-pyth5p-code"
        >
            <AceEditor
                ref={prog}
                mode="python"
                theme="github"
                onChange={ val => onChangeCheck ? runit(val) : setCode(val) }
                defaultValue={defaultVal}
                name="pyth5p-code-editor"
                width="100%"
                setOptions={props.editorOptions}
                editorProps={{ $blockScrolling: true }}
            />
            <Button 
                visible={!onChangeCheck} 
                onLaunchAction={() => runit()} {...props} 
            />
            
        </section>
    );
});

Snippet.displayName = 'Snippet'

Snippet.propTypes = {
    /** Id */
    id: PropTypes.number.isRequired,
    /** The code of the program */
    code: PropTypes.string.isRequired,
    /** isEditable allows snippet code modification */ 
    isEditable: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    /** checkOnEdit enables the editor listener for changes */
    checkOnEdit: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired
};

export default Snippet;