import React from 'react';
import './button.css';
import PropTypes from 'prop-types';

export default function Button({visible, onLaunchAction, ...props}) {
    return (
        visible
            ? <button role="button" className="pyth5p-run-btn" onClick={onLaunchAction}>
                <i className="play"></i> {props.l10n.run}
              </button>
            : null
    );
}

Button.propTypes = {
    /** The app localization strings */
    l10n: PropTypes.array.isRequired,
    /** Visibility state of the button */
    visible: PropTypes.bool.isRequired,
    /** Event to perform the code check */
    onLaunchAction: PropTypes.func,
};