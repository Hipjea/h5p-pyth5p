import React, { useEffect, useState } from 'react';
import Feedback from './Feedback';
import Button from './Button';
import Answer from './Answer';
import { usePythonCodeContext } from '../PythonCodeContext';
import { createPreservedMarkup } from '../utils/utils';
import xAPILib from '../utils/xapi';
import './footer.css';


export default function Footer({userCode, out, isCodeRun, performRetry, ...props}) {
    const isExercise = (props.contentType.isExercise === 'true' || 
                        props.contentType.isExercise === true);
    const context = usePythonCodeContext(),
        [checkBtn, toggleCheckBtn] = useState([]),
        [correction, setCheckCode] = useState(null),
        [showSolutions, setShowSolutions] = useState(false),
        [showSolutionButton, setShowSolutionButton] = useState(false),
        [answers, setAnswers] = useState([]),
        [score, setScore] = useState(0);
    let footer, progressBar = null;

    useEffect(() => {
        footer = H5P.jQuery('.footer-container');
        progressBar = H5P?.JoubelUI?.createScoreBar(1, 'scoreBarLabel') || null;
    });

    const checkCode = () => {
        setShowSolutionButton(!showSolutionButton);
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
        return <Answer key={i} id={i} answer={answer} {...props} />;
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
                        {...props}
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
                    {...props}
                /> : null
            }
            { isExercise && !checkBtn && score < 1 ?   
                <Button
                    title="Submit"
                    cls="h5p-joubelui-button h5p-question-try-again"
                    onLaunchAction={() => resetTask()}
                    testid="retrybutton"
                    text={props.l10n.retryButtonLabel}
                    {...props}
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
