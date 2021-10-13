import React, { useState } from 'react';
import Snippet from './Snippet';
import { Preview } from './Preview';
import Footer from './Footer';
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
    fn: any,
    code: string,
    statement: string,
    behaviour: Behaviour,
    contentType: ContentType,
    answerText: string,
    l10n: L10n
};

export default function Main({id, fn, ...props}: Props) {
    const codeeditor = React.createRef<HTMLInputElement>(),
        pre = React.createRef<HTMLInputElement>(),
        canvas = React.createRef<HTMLInputElement>();

    const previewRefs: any = { pre, canvas };
    const defaultVal: string = decodeHtmlEntities(props.code);

    const [userCode, setUserCode] = useState<string>(props.code),
        [out, setOutText] = useState<string>(''),
        [localCode, setCode] = useState<string>(defaultVal),
        [isCodeRun, setIsCodeRun] = useState<boolean>(false);
    
    const clearOutText = (): ReturnType<(s: string) => void> => {
        setOutText(''); // Clear preview
    }

    const outTextCallback = (text: string): ReturnType<(s: string) => void> => {
        setOutText(rest => rest + text);
    }

    const setCodeCb = (newCode: string): ReturnType<(s: string) => void> => {
        setCode(newCode), setIsCodeRun(false);
        fn.trigger('resize'); // Resize the H5P container
    }

    const retryCb = (): ReturnType<() => void> => {
        setIsCodeRun(false), clearOutText();
    }

    const builtinRead = (x: string) => {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }

    const runCode = (val?: string) => {
        const value = val ?? localCode;
        clearOutText(), setUserCode(value), setIsCodeRun(true);

        Sk.pre = pre.current;
        Sk.configure({ output: outTextCallback, read: builtinRead, __future__: Sk.python3 }); 
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = canvas.current;
        const SkPromise = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, value, true);
        });

        SkPromise.then((_: any) => {
            fn.trigger('resize');
        }, (err: string): ReturnType<(s: string) => void> => {
            const errStr = err.toString();
            console.error(errStr);
            setOutText(errStr);
            fn.trigger('resize');
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
                    klass="pyth5p-run-btn"
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
                fn={fn}
                {...props} 
            />
        </div>
    );
}
