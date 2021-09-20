import React, { useEffect, useState } from 'react';
import Feedback from './Feedback';
import Button from './Button';
import Answer from './Answer';
import type { ContentType } from '../types/contentType';
import type { Behaviour } from '../types/behaviour';
import type { Answer as TAnswer } from '../types/answer';
import type { L10n } from '../types/l10n';
import { usePythonCodeContext } from '../utils/PythonCodeContext';
import { createPreservedMarkup } from '../utils/utils';
import xAPILib from '../utils/xapi';
import './footer.css';

export type Props = {
    userCode: string;
    isCodeRun: boolean;
    performRetry: () => void;
    l10n: L10n;
    contentType: ContentType;
    behaviour: Behaviour
};

export default function Footer({userCode, isCodeRun, performRetry, ...props}: Props) {
    const isExercise = props.contentType.isExercise === true;

    const context = usePythonCodeContext(),
        [checkBtn, toggleCheckBtn] = useState<boolean>(true),
        [correction, setCheckCode] = useState<string>(''),
        [showSolutions, setShowSolutions] = useState<boolean>(false),
        [showSolutionButton, setShowSolutionButton] = useState<boolean>(false),
        [answers, setAnswers] = useState<Array<TAnswer>>([]),
        [score, setScore] = useState<number>(0);

    let footer: JQuery, progressBar: any; // must use 'any' to tweak the missing h5p types (setScore)

    useEffect(() => {
        footer = H5P.jQuery('.footer-container');
        progressBar = H5P?.JoubelUI?.createScoreBar(1, 'scoreBarLabel') || null;
    });

    const checkCode = () => {
        setShowSolutionButton(true);
        setCheckCode(props.contentType.correction.correctionText);
        setAnswers(props.contentType.correction.answers);
        const score = getScore();
        setScore(score);
        return score;
    }

    const resetTask = () => {
        setShowSolutions(false);
        setShowSolutionButton(false);
        toggleCheckBtn(true);
        performRetry();
        footer.find('.h5p-joubelui-score-bar').remove();
        context.trigger('resize');
    }

    function getScore() {
        const answerTexts = props.contentType.correction.answers.map(a => createPreservedMarkup(a.text));
        const userAnswer = createPreservedMarkup(userCode);
        let score = 0;
        answerTexts.map((answer) => answer == userAnswer ? score = 1 : null );
        return score;
    }

    function checkResults() {
        const score = checkCode();
        const attributes = {
            name: props.l10n.name,
            description: props.l10n.description,
            interactionType: "fill-in",
            correctResponsesPattern: props.contentType?.correction?.answers ? props.contentType.correction.answers.map(a => a.text) : []
        }
        const xAPI = new xAPILib(context, 'answered', attributes, score, userCode);
        const completedEvent = xAPI.build();
        if (completedEvent) {
            context.trigger(completedEvent, completedEvent.data);
            toggleCheckBtn(!checkBtn);
            progressBar.setScore(score);
            progressBar.appendTo(footer);
            // Set focus on the first button in the footer
            footer.children('button').first().focus();
            context.trigger('resize');
        }
    }

    const showSolutionCb = () => {
        setShowSolutionButton(false);
        setShowSolutions(true);
        context.trigger('resize');
    }

    const listAnswers = answers.map((answer, i) => {
        return <Answer key={i} id={`${i}`} answer={answer} {...props} />;
    });

    return (
        <footer className="footer-container">
            { isExercise && checkBtn ?   
                <>
                    <Button
                        id="pyth5p-checkbutton"
                        title="Submit"
                        cls="h5p-joubelui-button h5p-question-check-answer"
                        onLaunchAction={() => checkResults()}
                        disabled={!isCodeRun}
                        testid="checkbutton"
                        text={props.l10n.checkAnswer}
                    />
                    <span className="check-indication">{!isCodeRun ? props.l10n.runBeforeCheck : ""}</span>
                </> : null
            }
            { isExercise && showSolutionButton && props.behaviour.enableSolutionsButton ?   
                <Button
                    title="Submit"
                    cls="h5p-joubelui-button h5p-question-show-solution"
                    onLaunchAction={() => showSolutionCb()}
                    text={props.l10n.showSolutionButtonLabel}
                /> : null
            }
            { isExercise && !checkBtn && score < 1 ?   
                <Button
                    title="Submit"
                    cls="h5p-joubelui-button h5p-question-try-again"
                    onLaunchAction={() => resetTask()}
                    testid="retrybutton"
                    text={props.l10n.retryButtonLabel}
                /> : null
            }
            { isExercise && showSolutions && props.behaviour.enableSolutionsButton ?   
                <>
                    <Feedback correction={correction} {...props} /> 
                    <h4 className="h5p-pyth5p-solution-text">{props.l10n.answers} :</h4>
                    <ul>{listAnswers}</ul> 
                </> : null 
            }
        </footer>
    );
}
