import React, { useRef } from 'react';
import { decodeHtmlEntities } from '../utils/utils';
import './snippet.css';
import AceEditor from "react-ace";
import PropTypes from 'prop-types';
import { defaultEditorSettings } from '../utils/editorSettings';


export const Snippet = React.forwardRef(({id, code, isEditable, setCode, ...props}, _) => {
    const prog = useRef(null);
    const defaultVal = decodeHtmlEntities(code);

    return (
        <section 
            id={`code-${id}`}
            className="h5p-pyth5p-code"
        >
            <AceEditor
                ref={prog}
                onChange={ val => setCode(val) }
                defaultValue={defaultVal}
                setOptions={props.editorOptions}
                { ...defaultEditorSettings }
            />
        </section>
    );
});

Snippet.displayName = 'Snippet'

Snippet.propTypes = {
    /** Id */
    id: PropTypes.number,
    /** The code of the program */
    code: PropTypes.string,
    /** isEditable allows snippet code modification */ 
    isEditable: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ])
};

export default Snippet;