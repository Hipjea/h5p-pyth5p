import React from 'react';
import Snippet from './Snippet';
import { createMarkup } from '../utils/utils';
import PropTypes from 'prop-types';


export default function Answer({id, answer, ...props}) {
    const answerClass = answer.bestAnswer ? "h5p-pyth5p-feedback-best-answer" : "h5p-pyth5p-feedback";
    return (
        <li className={answerClass}>
            <div className="feedback-separator" />
            { answer.bestAnswer ? <h5>{props.l10n.bestAnswer}</h5> : null }
            <Snippet
                id={`pyth5p-answer-${id}`}
                code={answer.text}
                answerText={answer.text}
                isEditable={props.behaviour.isEditable}
                {...props}
            />
            { answer.tipsAndFeedback 
                ? <div className="h5p-pyth5p-feedback-tips"
                    dangerouslySetInnerHTML={ createMarkup(answer.tipsAndFeedback) } /> 
                : null 
            }
        </li>
    );
};

Answer.propTypes = {
    /** The key id passed by the parent loop */
    id: PropTypes.number.isRequired,
    /** The answer object */
    answer: PropTypes.object.isRequired
};
