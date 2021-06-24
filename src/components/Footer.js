import React, { useState } from 'react';
import './button.css';
import { Results } from './Results';

jQuery = H5P.jQuery;

export default function Footer({...props}) {
    const UI = props.UI;
    const [checkBtn, toggleCheckBtn] = useState([]);

    const result = 1;

    function displayResult() {
        toggleCheckBtn(!checkBtn);
        let $footer = jQuery('.footer-container');
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

    return (
        <footer>
            { checkBtn
                ? <button 
                        title="Submit"
                        className="h5p-joubelui-button"
                        onClick={() => displayResult()}
                    >
                        <span><i className="fa fa-check-circle" aria-hidden="true"></i></span>&nbsp; {props.l10n.checkAnswer}
                    </button>
                : null
            }
        </footer>
    );
}
