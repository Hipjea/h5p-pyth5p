import React from 'react';
import './feedback.css';
import { createMarkup } from '../utils/utils';
import { Feedback } from '../types/Feedback';

const Feedback = ({correction, ...props}: Feedback) => {
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
