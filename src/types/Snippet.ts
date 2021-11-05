import type { EditorOptions } from './editor/editorOptions';

export type Snippet = {
    isEditable: boolean;
    code: string;
    setLocalCode: (value: string) => void;
    answerText: string;
    editorOptions?: EditorOptions;
};
