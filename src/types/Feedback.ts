import type { L10n } from '../types/l10n';

export type Feedback = {
    correction: string | undefined;
    l10n: L10n;
};
