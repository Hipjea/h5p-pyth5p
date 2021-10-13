import type { Behaviour } from '../behaviour';
import type { ContentType } from '../contentType';
import type { L10n } from '../l10n';


export type Params = {
  params: {
    id: string,
    code: string,
    statement: string,
    behaviour: Behaviour,
    contentType: ContentType,
    answerText: string,
    l10n: L10n
  }
};
