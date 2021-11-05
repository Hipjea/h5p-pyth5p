import React, { useContext } from 'react';
import { AppContext } from '../components/Context';
import type { Preview as PreviewProps } from '../types/Preview';
import './preview.css';


export const Preview = React.forwardRef<HTMLInputElement, PreviewProps>(({...props}: PreviewProps, refs) => {
    const { pre, canvas }: any = refs;
    const { outText } = useContext(AppContext);

    return (
        <>
            <div className="pyth5p-pre-wrapper">
                <div className="pre-labbel-wrapper">
                    <label>{props.l10n.output}</label>
                </div>
                <pre ref={pre} role="pre" className="pyth5p-pre">
                    {outText}
                </pre>
            </div>
            <div ref={canvas} />
        </>
    );
});
