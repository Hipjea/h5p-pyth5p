import React from 'react';
import type { Preview as PreviewProps } from '../types/Preview';
import './preview.css';


export const Preview = React.forwardRef<HTMLInputElement, PreviewProps>(({out, ...props}: PreviewProps, refs) => {
    const { pre, canvas }: any = refs;

    return (
        <>
            <div className="pyth5p-pre-wrapper">
                <div className="pre-labbel-wrapper">
                    <label>{props.l10n.output}</label>
                </div>
                <pre ref={pre} role="pre" className="pyth5p-pre">
                    {out}
                </pre>
            </div>
            <div ref={canvas} />
        </>
    );
});
