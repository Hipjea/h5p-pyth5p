import React from 'react';
import './button.css';
import type { Button as ButtonType } from '../types/Button';


const Button = ({
    id, 
    title, 
    klass, 
    onLaunchAction, 
    disabled = false, 
    testid, 
    icon, 
    text
}: ButtonType) => {
    return (
        <button 
            id={id}
            role="button" 
            title={title ?? ""} 
            className={klass} 
            onClick={onLaunchAction}
            data-testid={testid ?? ""}
            disabled={disabled}
        >
            {icon} 
            {text}
        </button>
    );
}

export default Button;