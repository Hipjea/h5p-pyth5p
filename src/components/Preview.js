import React from 'react';

export const Preview = React.forwardRef((props, ref) => {
    const { pre, canvas } = ref;

    return (
        <>
            <div className="pyth5p-pre-wrapper">
                <label>{props.l10n.output}</label>
                <pre id="pyth5p-pre" ref={pre}>
                    {props.out}
                </pre>
            </div>
            <div ref={canvas}></div>
        </>
    );
});