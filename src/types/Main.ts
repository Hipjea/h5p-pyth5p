import type { ContentType } from './contentType';
import type { Behaviour } from './behaviour';
import type { L10n } from '../types/l10n';

export type Main = {
    id: string,
    fn: any,
    code: string,
    statement: string,
    behaviour: Behaviour,
    contentType: ContentType,
    answerText: string,
    l10n: L10n
};
