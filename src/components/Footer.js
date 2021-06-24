import React, { useState } from 'react';
import Feedback from './Feedback';


jQuery = H5P.jQuery;

export default function Footer({...props}) {
    const UI = props.UI;
    const [checkBtn, toggleCheckBtn] = useState([]);
    const [correction, setCheckCode] = useState(null);
    const [answers, setAnswers] = useState([]);

    const result = 1;

    function checkCode() {
        setCheckCode(props.contentType.correction.correctionCode);
        setAnswers(props.contentType.correction.answers);
    };

    function displayResult() {
        checkCode();
        toggleCheckBtn(!checkBtn);
        const $footer = jQuery('.footer-container');
        const $progressBar = UI.createScoreBar(1, 'scoreBarLabel');
        $progressBar.setScore(result);
        $progressBar.appendTo($footer);

        var completedEvent = props.self.createXAPIEventTemplate('completed');
        completedEvent.setScoredResult(result, 1, self, true,
            result === 1);
        props.self.trigger(completedEvent);
        console.log(completedEvent);
        // Set focus on the first button in the footer
        props.self.$footer.children('button').first().focus();
        props.self.trigger('resize');
    }

    const listAnswers = answers.map((answer, i) => <li key={i}>{answer.text}</li>);

    return (
        <footer>
            { checkBtn
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
