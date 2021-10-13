import { EditorOptions } from '../../src/types/editorOptions';

export const defaultEditorContext : EditorOptions = {
    mode: "python",
    readOnly: false,
    autofocus: true,
    smartIndent: true,
    indentUnit: 4,
    indentWithTabs: true,
    lineWrapping: true,
    foldGutter: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    styleActiveLine: true,
    lineNumbers: true
};

export const uneditableEditorContext : EditorOptions = {
    mode: "python",
    readOnly: true,
    autofocus: true,
    smartIndent: true,
    indentUnit: 4,
    indentWithTabs: true,
    lineWrapping: true,
    foldGutter: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    styleActiveLine: true,
    lineNumbers: true
};
