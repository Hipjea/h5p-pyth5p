import React from 'react';
import Snippet from './Snippet';


export default function Main(props) {
    function createMarkup() {
        return {__html: props.statement};
    }

    return (
        <div className="h5p-pyth5p-main">
            <p className="statement" dangerouslySetInnerHTML={createMarkup()}></p>
            <div className="h5p-pyth5p-code-wrapper">
                <Snippet
                    id={props.id}
                    code={props.code}
                    {...props}
                />
            </div>
        </div>
    );
}
