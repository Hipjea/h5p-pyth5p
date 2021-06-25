import React, { useState } from 'react';
import Feedback from './Feedback';
import { usePythonCodeContext } from '../PythonCodeContext';


export default function Footer({...props}) {
    const [checkBtn, toggleCheckBtn] = useState([]);
    const [correction, setCheckCode] = useState(null);
    const [answers, setAnswers] = useState([]);
    const context = usePythonCodeContext();
    const isExercise = (props.contentType.isExercise === 'true');

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

    const listAnswers = answers.map((answer, i) => <li key={i}>{answer.text}</li>);

    return (
        <footer className="footer-container">
            { checkBtn && isExercise
                ? <button 
                        title="Submit"
                        className="h5p-joubelui-button"
                        onClick={() => displayResult()}
                    >
                        <span><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                        &nbsp; {props.l10n.checkAnswer}
                    </button>
                : null
            }
            <Feedback correction={correction} {...props} />
            { listAnswers ? <ul>{listAnswers}</ul> : null }
        </footer>
    );
}
