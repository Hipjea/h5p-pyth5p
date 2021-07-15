import React, { useEffect, useState } from 'react';
import Feedback from './Feedback';
import { usePythonCodeContext } from '../PythonCodeContext';
import { createPreservedMarkup } from '../utils/utils';
import xAPILib from '../utils/xapi';
import Snippet from './Snippet';
import { createMarkup } from '../utils/utils';
import './footer.css';


export default function Footer({userCode, out, ...props}) {
    const isExercise = (props.contentType.isExercise === 'true' || 
                        props.contentType.isExercise === true);
    const context = usePythonCodeContext(),
        [checkBtn, toggleCheckBtn] = useState([]),
        [correction, setCheckCode] = useState(null),
        [showSolutions, setShowSolutions] = useState(false),
        [showSolutionButton, setShowSolutionButton] = useState(false),
        [displayFeedback, setdisplayFeedback] = useState(false),
        [answers, setAnswers] = useState([]),
        [score, setScore] = useState(0);
    let footer, progressBar = null;

    useEffect(() => {
        footer = H5P.jQuery('.footer-container');
        progressBar = H5P.JoubelUI.createScoreBar(1, 'scoreBarLabel');
    });

    const checkCode = () => {
        setShowSolutions(!showSolutions);
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
        setdisplayFeedback(false);
        toggleCheckBtn(true);
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
        const xAPI = new xAPILib(context, 'answered', attributes, score, "print(\"Hello world !\")");
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

    const displayFeedbackCb = () => {
        setShowSolutionButton(!showSolutionButton);
        setdisplayFeedback(!displayFeedback);
        context.trigger('resize');
    }

    const listAnswers = answers.map((answer, i) => {
        const answerClass = answer.bestAnswer ? "h5p-pyth5p-feedback-best-answer" : "h5p-pyth5p-feedback";
        return (
            <li key={i} className={answerClass}>
                { answer.bestAnswer ? <h5>{props.l10n.bestAnswer}</h5> : null }
                <Snippet
                    id={`pyth5p-answer-${i}`}
                    code={answer.text}
                    answerText={answer.text}
                    isEditable={props.behaviour.isEditable}
                    {...props}
                />
                { answer.tipsAndFeedback 
                    ? <div className="h5p-pyth5p-feedback-tips"
                        dangerouslySetInnerHTML={createMarkup(answer.tipsAndFeedback)} /> 
                    : null 
                }
                <div className="feedback-separator" />
            </li>
        );
    });

    return (
        <footer className="footer-container">
            { isExercise && checkBtn
                ?   <button 
                        id="pyth5p-checkbutton"
                        data-testid="checkbutton"
                        title="Submit"
                        className="h5p-joubelui-button"
                        onClick={() => checkResults()}
                    >
                        <span><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                        &nbsp; {props.l10n.checkAnswer}
                    </button>
                :   null
            }
            { isExercise && showSolutionButton && props.behaviour.enableSolutionsButton
                ?   <button 
                        title="Submit"
                        className="h5p-joubelui-button"
                        onClick={() => displayFeedbackCb()}
                    >
                        <span><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                        &nbsp; {props.l10n.showSolutionButtonLabel}
                    </button>
                :   null
            }
            { isExercise && displayFeedback && score < 1
                ?   <button 
                        data-testid="retrybutton"
                        title="Submit"
                        className="h5p-joubelui-button"
                        onClick={() => resetTask()}
                    >
                        {props.l10n.retryButtonLabel}
                    </button>
                :   null
            }
            { isExercise && displayFeedback && props.behaviour.enableSolutionsButton
                ?   <Feedback correction={correction} {...props} /> 
                :   null 
            }
            { isExercise && listAnswers && showSolutions && displayFeedback
                ?   <>
                        <h4 className="h5p-pyth5p-solution-text">{props.l10n.answers} :</h4>
                        <ul>{listAnswers}</ul> 
                    </>
                :   null 
            }
        </footer>
    );
}
