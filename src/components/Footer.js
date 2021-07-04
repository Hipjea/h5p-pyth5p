import React, { useState } from 'react';
import Feedback from './Feedback';
import { usePythonCodeContext } from '../PythonCodeContext';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import { feedbackEditorSettings } from '../utils/editorSettings';
import { decodeHTML, createPreservedMarkup } from '../utils/utils';
import xAPILib from '../utils/xapi';


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
        context.trigger(completedEvent, completedEvent.data);
        //console.log("completedEvent", completedEvent);

        toggleCheckBtn(!checkBtn);

        const $footer = H5P.jQuery('.footer-container');
        const $progressBar = H5P.JoubelUI.createScoreBar(1, 'scoreBarLabel');
        $progressBar.setScore(score);
        $progressBar.appendTo($footer);

        // Set focus on the first button in the footer
        $footer.children('button').first().focus();
        context.trigger('resize');
    }

    const displaySolutionCb = () => {
        setShowSolutionButton(!showSolutionButton);
        setDisplaySolution(!displaySolution);
    }

    const listAnswers = answers.map((answer, i) => (
        <div key={i} className="h5p-pyth5p-feedback">
            <AceEditor
                defaultValue={decodeHTML(answer.text)}
                setOptions={props.editorOptions}
                readOnly={true}
                { ...feedbackEditorSettings }
            />
            <div className="feedback-separator" />
        </div>
    ));

    return (
        <footer className="footer-container">
            { isExercise && checkBtn
                ?   <button 
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
