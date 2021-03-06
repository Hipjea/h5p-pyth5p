import React, { useContext, useEffect } from 'react';
import type { Snippet as SnippetProps } from '../types/Snippet';
import {¬†AppContext } from './Context';
import {¬†decodeHtmlEntities } from '../utils/utils';
import './snippet.css';
import codemirror from 'codemirror';
import 'codemirror/mode/python/python';


export const Snippet = React.forwardRef(({isEditable, code, setLocalCode, answerText, ...props}: SnippetProps, ref) => {
    const {¬†id } = useContext(AppContext);

    const codeeditor: any = ref || React.createRef();
    
    const changeValue = (doc: CodeMirror.Editor, _: any) => {
        setLocalCode(doc.getValue());
    }

    if (codeeditor == undefined || ref == null || ref == undefined) {
        const answer = React.createRef<HTMLDivElement>();
        const answerVal = decodeHtmlEntities(answerText);
        useEffect(() => {
            if (answer) { // overcomes React 'current' property assignment on mount
                const answerNode = answer.current as HTMLElement;
                codemirror(answerNode, { ...props.editorOptions, readOnly: true, value: answerVal });
            }
        }, []);
        return ( <div ref={answer} /> );
    }
    else {
        const defaultVal = code != undefined ? decodeHtmlEntities(code) : '';
        useEffect(() => {
            const editor = codemirror.fromTextArea(codeeditor.current, { ...props.editorOptions, readOnly: !isEditable });
            editor.on('change', changeValue);
        }, []);
        return (
            <section id={`code-${id}`} className="h5p-pyth5p-code">
                <textarea ref={codeeditor} defaultValue={defaultVal} />
            </section>
        );
    }
});

Snippet.displayName = 'Snippet'

export default Snippet;