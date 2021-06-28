import React from 'react';
import './feedback.css';
import PropTypes from 'prop-types';
import { createMarkup } from '../utils/utils';


export default function Feedback({correction, ...props}) {
    return (
        <div className="feedback">
            <div className="correction" dangerouslySetInnerHTML={createMarkup(correction)} />
        </div>
    );
}

Feedback.propTypes = {
    /** The correction specified in the settings */
    correction: PropTypes.string
};
