import type { EditorAnswer } from './editor/answer';
import type { Behaviour } from './editor/behaviour';
import type { L10n } from '../types/l10n';

export type Answer = {
    id: string;
    answer: EditorAnswer;
    l10n: L10n;
    behaviour: Behaviour
};
