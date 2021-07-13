import React, { useState } from 'react';
import Feedback from './Feedback';
import { usePythonCodeContext } from '../PythonCodeContext';
import { createPreservedMarkup } from '../utils/utils';
import xAPILib from '../utils/xapi';
import Snippet from './Snippet';
import './footer.css';


export default function Footer({userCode, out, ...props}) {
    const isExercise = (props.contentType.isExercise === 'true' || 
                        props.contentType.isExercise === true);
    const context = usePythonCodeContext(),
        [checkBtn, toggleCheckBtn] = useState([]),
        [correction, setCheckCode] = useState(null),
        [showResults, setShowResults] = useState(false),
        [showSolutionButton, setShowSolutionButton] = useState(false),
        [displaySolution, setDisplaySolution] = useState(false),
        [answers, setAnswers] = useState([]);

    const checkCode = () => {
        setShowResults(!showResults);
        setShowSolutionButton(!showSolutionButton);
        setCheckCode(props.contentType.correction.correctionCode);
        setAnswers(props.contentType.correction.answers);
    }

    function checkUserAnswer() {
        const answerTexts = props.contentType.correction.answers.map(a => createPreservedMarkup(a.text));
        const userAnswer = createPreservedMarkup(userCode);
        let score = 0;
        answerTexts.map((answer) => answer == userAnswer ? score = 1 : null );
        return score;
    }

    function displayResult() {
        checkCode();
        const score = checkUserAnswer();

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

            const $footer = H5P.jQuery('.footer-container');
            const $progressBar = H5P.JoubelUI.createScoreBar(1, 'scoreBarLabel');
            $progressBar.setScore(score);
            $progressBar.appendTo($footer);

            // Set focus on the first button in the footer
            $footer.children('button').first().focus();
            context.trigger('resize');
        }
    }

    const displaySolutionCb = () => {
        setShowSolutionButton(!showSolutionButton);
        setDisplaySolution(!displaySolution);
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
                        onClick={() => displayResult()}
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
                        onClick={() => displaySolutionCb()}
                    >
                        <span><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                        &nbsp; {props.l10n.showSolutionButton}
                    </button>
                :   null
            }
            { isExercise && displaySolution && props.behaviour.enableSolutionsButton
                ?   <Feedback correction={correction} {...props} /> 
                :   null 
            }
            { isExercise && listAnswers && showResults && displaySolution
                ?   <>
                        <h4 className="h5p-pyth5p-solution-text">{props.l10n.answers}</h4>
                        <ul>{listAnswers}</ul> 
                    </>
                :   null 
            }
        </footer>
    );
}
