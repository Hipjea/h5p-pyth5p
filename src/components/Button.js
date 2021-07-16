import React from 'react';
import './button.css';
import PropTypes from 'prop-types';


export default function Button({id, title, cls, onLaunchAction, disabled = false, testid, icon, text}) {
    return (
        <button 
            id={id || null}
            role="button" 
            title={title || ""} 
            className={cls} 
            onClick={onLaunchAction}
            data-testid={testid || null}
            disabled={disabled}
        >
            {icon} 
            {text}
        </button>
    );
}

Button.propTypes = {
    /** The markup id */
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    /** The markup title */
    title: PropTypes.string,
    /** The markup className value */
    cls: PropTypes.string,
    /** Event to perform the code check */
    onLaunchAction: PropTypes.func,
    /** The disableness of the button */
    disabled: PropTypes.bool,
    /** The markup test-id */
    testid: PropTypes.string,
    /** The button icon markup */
    icon: PropTypes.object,
    /** The markup text */
    text: PropTypes.string.isRequired
};
