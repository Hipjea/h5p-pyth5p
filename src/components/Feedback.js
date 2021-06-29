import React from 'react';
import './feedback.css';
import PropTypes from 'prop-types';
import { createMarkup } from '../utils/utils';


export default function Feedback({correction, ...props}) {
    return (
        <div className="h5p-pyth5p-feedback">
            { correction
                ? <>
                    <p className="h5p-pyth5p-solution-text">{props.l10n.solution}</p>
                    <div className="h5p-pyth5p-feedback-text correction" 
                        dangerouslySetInnerHTML={createMarkup(correction, true)} />
                </>
                : null
            }
        </div>
    );
}

Feedback.propTypes = {
    /** The correction specified in the settings */
    correction: PropTypes.string
};
