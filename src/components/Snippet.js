import React, { useEffect } from 'react';
import { decodeHtmlEntities } from '../utils/utils';
import './snippet.css';
import * as codemirror from 'codemirror';
import 'codemirror/mode/python/python';
import PropTypes from 'prop-types';


export const Snippet = React.forwardRef(({id, code, isEditable, setCode, answerText, ...props}, ref) => {
    const { codeeditor } = ref || React.createRef();

    const changeValue = (doc, _) => {
        setCode(doc.getValue());
    }

    if (codeeditor == undefined || ref == null || ref == undefined) {
        const answer = React.createRef();
        const answerVal = decodeHtmlEntities(answerText);
        useEffect(() => {
            codemirror(answer.current, {
                ...props.editorOptions,
                readOnly: true,
                value: answerVal
            });
        }, []);

        return (
            <div ref={answer} />
        );
    } else {
        const defaultVal = code != undefined ? decodeHtmlEntities(code) : '';
        useEffect(() => {
            const editor = codemirror.fromTextArea(codeeditor.current, {
                ...props.editorOptions,
                readOnly: !isEditable
            });
            editor.on('change', changeValue);
        }, []);

        return (
            <section 
                id={`code-${id}`}
                className="h5p-pyth5p-code"
            >
                <textarea 
                    ref={codeeditor} 
                    defaultValue={defaultVal} 
                />
            </section>
        );
    }
});

Snippet.displayName = 'Snippet'

Snippet.propTypes = {
    /** Id */
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    /** The code of the program */
    code: PropTypes.string,
    /** isEditable allows snippet code modification */ 
    isEditable: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    /** The answer code shown in the solution */ 
    answerText: PropTypes.string
};

export default Snippet;