import type { ContentType } from './editor/contentType';
import type { Behaviour } from './editor/behaviour';
import type { L10n } from '../types/l10n';

export type Main = {
    id: string;
    code: string;
    statement: string;
    behaviour: Behaviour;
    contentType: ContentType;
    answerText: string;
    l10n: L10n;
};
