import React, { useState } from 'react';
import Feedback from './Feedback';
import { usePythonCodeContext } from '../PythonCodeContext';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import { feedbackEditorSettings } from '../utils/editorSettings';
import { decodeHTML } from '../utils/utils';
import xAPILib from '../utils/xapi';

export default function Footer({out, ...props}) {
    const isExercise = (props.contentType.isExercise === 'true' || 
                        props.contentType.isExercise === true);
    const [checkBtn, toggleCheckBtn] = useState([]);
    const [correction, setCheckCode] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState([]);
    const context = usePythonCodeContext();

    const result = 1;

    function checkCode() {
        setShowResults(!showResults);
        setCheckCode(props.contentType.correction.correctionCode);
        setAnswers(props.contentType.correction.answers);
    };

    function displayResult() {
        const attributes = {
            name: props.l10n.name,
            description: props.l10n.description,
            interactionType: "fill-in",
            correctResponsesPattern: props.contentType?.correction?.answers ? props.contentType.correction.answers.map(a => a.text) : []
        }
        console.log(attributes)
        const xAPI = new xAPILib(context, 'answered', attributes, 1, "print(\"Hello world !\")");
        const completedEvent = xAPI.build();
        context.trigger(completedEvent, completedEvent.data);
        console.log("completedEvent", completedEvent);

        checkCode();
        toggleCheckBtn(!checkBtn);

        const $footer = H5P.jQuery('.footer-container');
        const $progressBar = H5P.JoubelUI.createScoreBar(1, 'scoreBarLabel');
        $progressBar.setScore(result);
        $progressBar.appendTo($footer);

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
            { listAnswers && isExercise && showResults
                ?   <>
                        <h4 className="solution-text">{props.l10n.answers}</h4>
                        <ul>{listAnswers}</ul> 
                    </>
                :   null 
            }
        </footer>
    );
}
