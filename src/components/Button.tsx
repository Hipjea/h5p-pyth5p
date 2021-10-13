import React from 'react';
import './button.css';

export type Props = {
    id?: string;
    title: string;
    klass: string;
    onLaunchAction: () => void;
    disabled?: boolean;
    testid?: string;
    icon?: HTMLElement|any;
    text: string;
};

const Button = ({
    id, 
    title, 
    klass, 
    onLaunchAction, 
    disabled = false, 
    testid, 
    icon, 
    text
}: Props) => {
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