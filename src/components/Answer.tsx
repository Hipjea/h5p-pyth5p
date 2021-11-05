import React from 'react';
import Snippet from './Snippet';
import type { Answer as AnswerProps } from '../types/Answer';
import { createMarkup } from '../utils/utils';


export default function Answer({id, answer, ...props}: AnswerProps) {
    const answerClass = answer.bestAnswer ? "h5p-pyth5p-feedback-best-answer" : "h5p-pyth5p-feedback";
    return (
        <li className={answerClass}>
            <div className="feedback-separator" />
            { answer.bestAnswer ? <h5>{props.l10n.bestAnswer}</h5> : null }
            <Snippet
                code={answer.text}
                answerText={answer.text}
                isEditable={props.behaviour.isEditable}
                setLocalCode={() => answer.text}
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
