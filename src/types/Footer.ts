import type { ContentType } from './editor/contentType';
import type { Behaviour } from './editor/behaviour';
import type { L10n } from '../types/l10n';

export type Footer = {
    l10n: L10n;
    contentType: ContentType;
    behaviour: Behaviour;
};
