import React from 'react';
import './feedback.css';
import PropTypes from 'prop-types';

export default function Feedback({correction, ...props}) {
    return (
        <div className="feedback">
            <div className="correction">{correction}</div>
        </div>
    );
}

Feedback.propTypes = {
    /** The correction specified in the settings */
    correction: PropTypes.string
};