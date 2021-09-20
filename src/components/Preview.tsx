import React from 'react';
import type { L10n } from '../types/l10n';
import './preview.css';

export type Props = {
    out: string;
    l10n: L10n;
};

export const Preview = React.forwardRef<HTMLInputElement, Props>(({out, ...props}: Props, refs) => {
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
