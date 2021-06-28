export const sharedOptions = {
    mode: "python",
    theme: "github",
    name: "pyth5p-code-editor",
    width: "100%",
    editorProps: {
        $blockScrolling: true
    }
}

export const defaultEditorSettings = {
    ...sharedOptions,
    editorOptions: {
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        tabSize: 4,
        fontSize: 13,
        showGutter: true,
        readOnly: false,
        behavioursEnabled: true,
        wrapBehavioursEnabled: true,
        maxLines: "Infinity",
        minLines: 5,
        fontFamily: "Monaco"
    }
}

export const feedbackEditorSettings = {
    ...sharedOptions,
    editorOptions: {
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        tabSize: 4,
        fontSize: 13,
        showGutter: true,
        readOnly: true,
        behavioursEnabled: true,
        wrapBehavioursEnabled: true,
        maxLines: "Infinity",
        minLines: 0,
        fontFamily: "Monaco"
    }
}
