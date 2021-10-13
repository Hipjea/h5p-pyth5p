import type { EditorOptions } from './editor/editorOptions';

export type Snippet = {
    id: string | number;
    code: string;
    isEditable: boolean;
    setCode: (value: string) => void;
    answerText: string;
    editorOptions?: EditorOptions;
};
