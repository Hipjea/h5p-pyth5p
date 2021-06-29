import React from 'react';
import './preview.css';
import PropTypes from 'prop-types';

export const Preview = React.forwardRef(({out, ...props}, ref) => {
    const { pre, canvas } = ref;

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

Preview.propTypes = {
    /** The app localization strings */
    l10n: PropTypes.object.isRequired,
    /** The output of the program */
    out: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ])
};
