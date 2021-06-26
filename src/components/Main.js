import React from 'react';
import Snippet from './Snippet';
import Footer from './Footer';

export default function Main({id, error, ...props}) {
    function createMarkup() {
        return {__html: props.statement};
    }

    return (
        <div className="h5p-pyth5p-main">
            <p className="statement" dangerouslySetInnerHTML={createMarkup()}></p>
            <div className="h5p-pyth5p-code-wrapper">
                <Snippet
                    id={id}
                    code={props.code}
                    isEditable={props.behaviour.isEditable}
                    checkOnEdit={props.behaviour.checkOnEdit}
                    {...props}
                />
            </div>
            <Footer {...props} />
        </div>
    );
}
