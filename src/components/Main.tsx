import React, { useContext, useState } from 'react';
import { AppContext } from '../components/Context';
import Snippet from './Snippet';
import { Preview } from './Preview';
import Footer from './Footer';
import { createMarkup } from '../utils/utils';
import 'codemirror/lib/codemirror.css';
import Button from './Button';
import { decodeHtmlEntities } from '../utils/utils';
import Sk from 'skulpt';
import type { Main as MainProps } from '../types/Main';


export default function Main({...props}: MainProps) {
    const { setUserCode, setCodeRun, setOutText } = useContext(AppContext);

    const codeeditor = React.createRef<HTMLInputElement>(),
        pre = React.createRef<HTMLInputElement>(),
        canvas = React.createRef<HTMLInputElement>();

    const previewRefs: any = { pre, canvas };
    const defaultVal: string = decodeHtmlEntities(props.code);

    const [localCode, setLocalCode] = useState<string>(defaultVal);
    
    const clearOutText = (): ReturnType<(s: string) => void> => {
        setOutText(''); // Clear preview
    }

    const setCodeCb = (newCode: string): ReturnType<(s: string) => void> => {
        setLocalCode(newCode);
        setCodeRun(false);
    }

    const builtinRead = (x: string) => {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw `File not found: '${x}'`;
        }
        return Sk.builtinFiles["files"][x];
    }

    const runCode = (val?: string) => {
        const value = val ?? localCode;
        clearOutText();
        setUserCode(value);
        setCodeRun(true);

        Sk.pre = pre.current;
        Sk.configure({ 
            output: setOutText, 
            read: builtinRead, 
            __future__: Sk.python3 
        });
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = canvas.current;
        const SkPromise = Sk.misceval.asyncToPromise(() => {
            return Sk.importMainWithBody("<stdin>", false, value, true);
        });

        SkPromise.then((_: any) => {
            H5P.PytH5P.prototype.trigger('resize');
        }, (err: string): ReturnType<(s: string) => void> => {
            const errStr = err.toString();
            console.error(errStr);
            setOutText(errStr);
            H5P.PytH5P.prototype.trigger('resize');
        });
    }

    return (
        <div className="h5p-pyth5p-main">
            <p 
                className="statement" 
                dangerouslySetInnerHTML={ createMarkup(props.statement, false) } 
            />
            <div className="h5p-pyth5p-code-wrapper">
                <Snippet
                    ref={codeeditor}
                    isEditable={props.behaviour.isEditable}
                    setLocalCode={setCodeCb}
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
                    {...props} 
                />
            </div>
            <Footer {...props} />
        </div>
    );
}
