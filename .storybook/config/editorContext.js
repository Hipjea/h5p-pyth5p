export const defaultEditorContext = {
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

export const uneditableEditorContext = {
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
        minLines: 5,
        fontFamily: "Monaco"
    }
}
