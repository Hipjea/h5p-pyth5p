import React from 'react';
import type { L10n } from '../types/l10n';
import './feedback.css';
import { createMarkup } from '../utils/utils';

export type Props = {
    correction: string | undefined;
    l10n: L10n;
};

const Feedback = ({correction, ...props}: Props) => {
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

export default Feedback;