import React, { useState } from 'react';
import Snippet from './Snippet';
import { Preview } from './Preview';
import Footer from './Footer';
import { usePythonCodeContext } from '../PythonCodeContext';
import { createMarkup } from '../utils/utils';
import 'codemirror/lib/codemirror.css';
import Button from './Button';
import { decodeHtmlEntities } from '../utils/utils';
import Sk from 'skulpt';
import type { Behaviour } from '../types/behaviour';
import type { ContentType } from '../types/contentType';
import type { L10n } from '../types/l10n';

export type Props = {
    id: string,
    code: string,
    statement: string,
    behaviour: Behaviour,
    contentType: ContentType,
    answerText: string,
    l10n: L10n
};

export default function Main({id, ...props}: Props) {
    const context = usePythonCodeContext();
    const codeeditor = React.createRef<HTMLInputElement>(),
        pre = React.createRef<HTMLInputElement>(),
        canvas = React.createRef<HTMLInputElement>();
    const previewRefs: any = { pre, canvas };
    const defaultVal = decodeHtmlEntities(props.code);
    const [userCode, setUserCode] = useState(props.code),
        [out, setOutText] = useState<string>(''),
        [localCode, setCode] = useState(defaultVal),
        [isCodeRun, setIsCodeRun] = useState(false);
    
    function clearOutText() {
        setOutText(''); // Clear preview
    }

    function outTextCallback(text: string) {
        setOutText(rest => rest + text);
    }

    function setCodeCb(newCode: string) {
        setCode(newCode);
        setIsCodeRun(false);
        context.trigger('resize'); // Resize the H5P container
    }

    function retryCb() {
        setIsCodeRun(false);
        clearOutText();
    }

    function builtinRead(x: string) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }

    function runCode(val?: string) {
        const value = val ?? localCode;
        clearOutText();
        setUserCode(value);
        setIsCodeRun(true);

        Sk.pre = pre.current;
        Sk.configure({ output: outTextCallback, read: builtinRead, __future__: Sk.python3 }); 
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = canvas.current;
        const SkPromise = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, value, true);
        });
        SkPromise.then(function(_: any) {
            context.trigger('resize');
        },
        function(err: any) {
            console.error(err.toString());
            setOutText(err.toString());
            context.trigger('resize');
        });
    }

    return (
        <div className="h5p-pyth5p-main">
            <p className="statement" dangerouslySetInnerHTML={ createMarkup(props.statement, false) } />
            <div className="h5p-pyth5p-code-wrapper">
                <Snippet
                    ref={codeeditor}
                    id={id}
                    isEditable={props.behaviour.isEditable}
                    setCode={setCodeCb}
                    {...props}
                />
                <Button 
                    title="Run code button"
                    cls="pyth5p-run-btn"
                    onLaunchAction={() => runCode()} 
                    icon={<i className="play-icon"></i>}
                    text={props.l10n.run}
                    {...props} 
                />
                <Preview 
                    ref={previewRefs} 
                    out={out} 
                    {...props} 
                />
            </div>
            <Footer 
                userCode={userCode} 
                isCodeRun={isCodeRun}
                performRetry={retryCb}
                {...props} 
            />
        </div>
    );
}
