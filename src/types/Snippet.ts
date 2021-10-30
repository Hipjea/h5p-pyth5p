import type { EditorOptions } from './editor/editorOptions';

export type Snippet = {
    code: string;
    isEditable: boolean;
    setCode: (value: string) => void;
    answerText: string;
    editorOptions?: EditorOptions;
};
