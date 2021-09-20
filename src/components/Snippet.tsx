import React, { useEffect } from 'react';
import type { EditorOptions } from '../types/editorOptions';
import { decodeHtmlEntities } from '../utils/utils';
import './snippet.css';
import codemirror from 'codemirror';
import 'codemirror/mode/python/python';

export type Props = {
    id: string | number;
    code: string;
    isEditable: boolean;
    setCode: (value: string) => void;
    answerText: string;
    editorOptions?: EditorOptions;
};

export const Snippet = React.forwardRef(({id, isEditable, setCode, answerText, ...props}: Props, ref) => {
    const codeeditor: any = ref || React.createRef();
    
    const changeValue = (doc: CodeMirror.Editor, _: any) => {
        setCode(doc.getValue());
    }

    if (codeeditor == undefined || ref == null || ref == undefined) {
        const answer = React.createRef<HTMLDivElement>();
        const answerVal = decodeHtmlEntities(answerText);
        useEffect(() => {
            if (answer) { // overcomes React 'current' property assignment on mount
                const answerNode = answer.current as HTMLElement;
                codemirror(answerNode, {
                    ...props.editorOptions,
                    readOnly: true,
                    value: answerVal
                });
            }
        }, []);
        return ( <div ref={answer} /> );
    } else {
        const defaultVal = props.code != undefined ? decodeHtmlEntities(props.code) : '';
        useEffect(() => {
            const editor = codemirror.fromTextArea(codeeditor.current, {
                ...props.editorOptions,
                readOnly: !isEditable
            });
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