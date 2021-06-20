import React, { useContext, useState, useEffect }from 'react';
import { render } from 'react-dom';
import { PythonCodeContext } from '../PythonCodeContext';


function Button(props) {
    var State = Object.freeze({
        ONGOING: 'ongoing',
        FINISHED_WRONG: 'finish-incorrect',
        FINISHED_CORRECT: 'finish-correct',
        SHOW_SOLUTION: 'show-solution'
    });

    function getStateFromStatus(status) {
        return State[status];
    }

    return (
        <button className={`${getStateFromStatus(props.status)} joubel-simple-rounded-button`}>
            {props.l10n.showSolutionButton}
        </button>
    );
}

export default Button;