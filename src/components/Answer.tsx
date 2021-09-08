import React from 'react';
import Snippet from './Snippet';
import type { Behaviour } from '../types/behaviour';
import type { Answer as TAnswer } from '../types/answer';
import type { L10n } from '../types/l10n';
import { createMarkup } from '../utils/utils';

export type Props = {
    id: string;
    answer: TAnswer;
    l10n: L10n;
    behaviour: Behaviour
};

export default function Answer({id, answer, ...props}: Props) {
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
                setCode={() => answer.text}
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
