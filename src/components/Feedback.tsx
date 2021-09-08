import React from 'react';
import type { L10n } from '../types/l10n';
import './feedback.css';
import { createMarkup } from '../utils/utils';

type Props = {
    correction: string;
    l10n: L10n;
};

export default function Feedback({correction, ...props}: Props) {
    return (
        <div className="h5p-pyth5p-feedback">
            { correction
                ? <>
                    <p className="h5p-pyth5p-solution-text">{props.l10n.solution} :</p>
                    <div className="h5p-pyth5p-feedback-text correction" 
                        dangerouslySetInnerHTML={createMarkup(correction, true)} />
                </>
                : null
            }
        </div>
    );
}
