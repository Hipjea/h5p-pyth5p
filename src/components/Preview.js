import React from 'react';
import './preview.css';
import PropTypes from 'prop-types';

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

Preview.propTypes = {
    /** The app localization strings */
    l10n: PropTypes.object.isRequired,
    /** The output of the program */
    out: PropTypes.array.isRequired,
};
