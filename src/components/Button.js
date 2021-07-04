import React from 'react';
import './button.css';
import PropTypes from 'prop-types';

export default function Button({visible, onLaunchAction, ...props}) {
    return (
        <button role="button" className="pyth5p-run-btn" onClick={onLaunchAction}>
            <i className="play"></i> {props.l10n.run}
        </button>
    );
}

Button.propTypes = {
    /** The app localization strings */
    l10n: PropTypes.object.isRequired,
    /** Event to perform the code check */
    onLaunchAction: PropTypes.func,
};
