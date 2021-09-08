import React from 'react';
import './button.css';

export type Props = {
    id?: string;
    title: string;
    cls: string;
    onLaunchAction: () => void;
    disabled?: boolean;
    testid?: string;
    icon?: HTMLElement|any;
    text: string;
};

export default function Button({id, title, cls, onLaunchAction, disabled = false, testid, icon, text}: Props) {
    return (
        <button 
            id={id}
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
