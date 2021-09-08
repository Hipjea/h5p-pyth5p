import type { Answer } from './answer';

export type ContentType = {
    isExercise: boolean;
    correction: {
        correctionText: string;
        answers: Array<Answer>;
    }
};