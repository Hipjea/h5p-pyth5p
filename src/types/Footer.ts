import type { ContentType } from './contentType';
import type { Behaviour } from './behaviour';
import type { L10n } from '../types/l10n';

export type Footer = {
    userCode: string;
    isCodeRun: boolean;
    performRetry: () => void;
    fn: any;
    l10n: L10n;
    contentType: ContentType;
    behaviour: Behaviour
};
