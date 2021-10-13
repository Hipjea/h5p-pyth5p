import React from 'react';
import './feedback.css';
import { createMarkup } from '../utils/utils';
import type { Feedback as FeedbackProps } from '../types/Feedback';


const Feedback = ({correction, ...props}: FeedbackProps) => {
    return (
        <div className="h5p-pyth5p-feedback">
            { correction
                ?   <>
                        <p className="h5p-pyth5p-solution-text">{props.l10n.solution} :</p>
                        <div className="h5p-pyth5p-feedback-text correction" 
                            dangerouslySetInnerHTML={createMarkup(correction, true)} />
                    </>
                :   null
            }
        </div>
    );
}

export default Feedback;
