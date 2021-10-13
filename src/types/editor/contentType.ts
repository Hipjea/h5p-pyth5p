import type { EditorAnswer } from './answer';

export type ContentType = {
    isExercise: boolean;
    correction?: {
        correctionText: string;
        answers: Array<EditorAnswer>;
    }
};
