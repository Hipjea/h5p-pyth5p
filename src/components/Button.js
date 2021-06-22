import React from 'react';

export default function Button(props) {
    return (
        props.visible
            ? <button role="button" className="pyth5p-run-btn" onClick={props.action}>
                <i className="fa fa-play"></i> {props.l10n.run}
              </button>
            : null
    );
}
