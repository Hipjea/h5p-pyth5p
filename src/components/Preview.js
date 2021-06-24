import React from 'react';
import './preview.css';


export const Preview = React.forwardRef((props, ref) => {
    const {pre, canvas} = ref;

    return (
        <>
            <div className="pyth5p-pre-wrapper">
                <div className="pre-labbel-wrapper">
                    <label>{props.l10n.output}</label>
                </div>
                <pre className="pyth5p-pre" ref={pre}>
                    {props.out}
                </pre>
            </div>
            <div ref={canvas} />
        </>
    );
});
