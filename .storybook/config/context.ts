import { ContentType } from '../../src/types/contentType';
import l10n from '../../src/localization';

export const defaultContext = {
    l10n: l10n,
    code: 'print("Hello world !")',
    contentType: {
        isExercise: true,
        correction: {
            correctionText: "print(\"Correction filler\")",
            answers: [
                {
                    text: 'print("Hello world")',
                    bestAnswer: false,
                    tipsAndFeedback: "<p>Tips...</p>"
                },
                {
                    text: 'print("Best answer code")',
                    bestAnswer: true,
                    tipsAndFeedback: "<p>This is the best answer</p>"
                }
            ]
        }
    } as ContentType,
    displaySettings: {
        codeWidth: '100',
        codeWidthUnit: '%'
    }
}

export const noExerciseContext = {
    l10n: l10n,
    code: 'print("Hello world !")',
    contentType: {
        isExercise: false
    } as ContentType,
    displaySettings: {
        codeWidth: '100',
        codeWidthUnit: '%'
    }
}
