import { sharedOptions, defaultEditorSettings } from '../../src/utils/editorSettings';

export const defaultEditorContext = defaultEditorSettings;

export const uneditableEditorContext = {
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
        minLines: 5,
        fontFamily: "Monaco"
    }
}
