import React, { useEffect, useState } from 'react';
import Feedback from './Feedback';
import Button from './Button';
import Answer from './Answer';
import type { EditorAnswer } from '../types/editor/answer';
import type { Footer as FooterProps } from '../types/Footer';
import { createPreservedMarkup } from '../utils/utils';
import xAPILib from '../utils/xapi';
import './footer.css';


export default function Footer({userCode, isCodeRun, performRetry, fn, ...props}: FooterProps) {
    const isExercise = props.contentType.isExercise === true;
    const [checkBtn, toggleCheckBtn] = useState<boolean>(true),
        [correction, setCheckCode] = useState<string | undefined>(''),
        [showSolutions, setShowSolutions] = useState<boolean>(false),
        [showSolutionButton, setShowSolutionButton] = useState<boolean>(false),
        [answers, setAnswers] = useState<Array<EditorAnswer> | undefined>([]),
        [score, setScore] = useState<number>(0);

    let footer: JQuery, progressBar: any; // must use 'any' to tweak the missing h5p types (setScore)

    useEffect(() => {
        footer = H5P.jQuery('.footer-container');
        progressBar = H5P.JoubelUI.createScoreBar(1, 'scoreBarLabel') || null;
    });

    const checkCode = (): number => {
        setShowSolutionButton(true);
        setCheckCode(props.contentType?.correction?.correctionText);
        setAnswers(props.contentType?.correction?.answers);
        const score = getScore();
        setScore(score);
        return score;
    }

    const resetTask = (): void => {
        setShowSolutions(false);
        setShowSolutionButton(false);
        toggleCheckBtn(true);
        performRetry();
        footer.find('.h5p-joubelui-score-bar').remove();
        fn.trigger('resize');
    }

    const getScore = (): number => {
        const answerTexts = props.contentType?.correction?.answers.map((a: EditorAnswer) => createPreservedMarkup(a.text));
        const userAnswer = createPreservedMarkup(userCode);
        let score = 0;
        if (answerTexts) {
            answerTexts.map((answer: string) => answer == userAnswer ? score = 1 : null );
        }
        return score;
    }

    const checkResults = (): void => {
        const score = checkCode();
        const attributes = {
            name: props.l10n.name,
            description: props.l10n.description,
            interactionType: "fill-in",
            correctResponsesPattern: props.contentType?.correction?.answers 
                ? props.contentType.correction.answers.map((a: EditorAnswer) => a.text) 
                : []
        }

        const xAPI = new xAPILib(fn, 'answered', attributes, score, userCode);
        const completedEvent = xAPI.build();

        if (completedEvent) {
            fn.trigger(completedEvent, completedEvent.data);
            toggleCheckBtn(!checkBtn);
            progressBar.setScore(score);
            progressBar.appendTo(footer);
            // Set focus on the first button in the footer
            footer.children('button').first().focus();
            fn.trigger('resize');
        }
    }

    const showSolutionCb = (): void => {
        setShowSolutionButton(false);
        setShowSolutions(true);
        fn.trigger('resize');
    }

    const listAnswers = answers ? answers.map((answer, i) => {
        return <Answer key={i} id={`${i}`} answer={answer} {...props} />;
    }) : null;

    return (
        <footer className="footer-container">
            { isExercise && checkBtn ?   
                <>
                    <Button
                        id="pyth5p-checkbutton"
                        title="Submit"
                        klass="h5p-joubelui-button h5p-question-check-answer"
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
                    klass="h5p-joubelui-button h5p-question-show-solution"
                    onLaunchAction={() => showSolutionCb()}
                    text={props.l10n.showSolutionButtonLabel}
                /> : null
            }
            { isExercise && !checkBtn && score < 1 ?   
                <Button
                    title="Submit"
                    klass="h5p-joubelui-button h5p-question-try-again"
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
