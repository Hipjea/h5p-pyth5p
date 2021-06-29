import React, { useState } from 'react';
import Feedback from './Feedback';
import { usePythonCodeContext } from '../PythonCodeContext';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import { feedbackEditorSettings } from '../utils/editorSettings';
import { decodeHTML } from '../utils/utils';


export default function Footer({out, ...props}) {
    const isExercise = (props.contentType.isExercise === 'true' || 
                        props.contentType.isExercise === true);
    const [checkBtn, toggleCheckBtn] = useState([]);
    const [correction, setCheckCode] = useState(null);
    const [answers, setAnswers] = useState([]);
    const context = usePythonCodeContext();

    const result = 1;

    function checkCode() {
        setCheckCode(props.contentType.correction.correctionCode);
        setAnswers(props.contentType.correction.answers);
    };

    function displayResult() {
        checkCode();
        toggleCheckBtn(!checkBtn);

        const $footer = H5P.jQuery('.footer-container');
        const $progressBar = H5P.JoubelUI.createScoreBar(1, 'scoreBarLabel');
        $progressBar.setScore(result);
        $progressBar.appendTo($footer);

        const completedEvent = context.createXAPIEventTemplate('completed');
        completedEvent.setScoredResult(result, 1, self, true, result === 1);
        context.trigger(completedEvent);
        console.log("completedEvent", completedEvent);
        // Set focus on the first button in the footer
        $footer.children('button').first().focus();
        context.trigger('resize');
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
            { checkBtn && isExercise
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
            <Feedback correction={correction} {...props} />
            { listAnswers 
                ?   <>
                        <p className="solution-text">{props.l10n.answers}</p>
                        <ul>{listAnswers}</ul> 
                    </>
                :   null 
            }
        </footer>
    );
}
