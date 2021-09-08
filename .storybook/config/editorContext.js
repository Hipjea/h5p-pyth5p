export const defaultEditorContext = {
    editorOptions: {
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
    }
}

export const uneditableEditorContext = {
    editorOptions: {
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
    }
}
